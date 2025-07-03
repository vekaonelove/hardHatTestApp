import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const CONTRACT_ABI = [
    {
        "inputs": [
            { "internalType": "address[]", "name": "_owners", "type": "address[]" },
            { "internalType": "uint256", "name": "_required", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getOwners",
        "outputs": [
            { "internalType": "address[]", "name": "", "type": "address[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransactionCount",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_txIndex", "type": "uint256" }
        ],
        "name": "getTransaction",
        "outputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "value", "type": "uint256" },
            { "internalType": "bytes", "name": "data", "type": "bytes" },
            { "internalType": "bool", "name": "executed", "type": "bool" },
            { "internalType": "uint256", "name": "numConfirmations", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_to", "type": "address" },
            { "internalType": "uint256", "name": "_value", "type": "uint256" },
            { "internalType": "bytes", "name": "_data", "type": "bytes" }
        ],
        "name": "submitTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletContract, setWalletContract] = useState(null);
    const [owners, setOwners] = useState([]);
    const [txCount, setTxCount] = useState(0);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                const _signer = _provider.getSigner();
                const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer);

                setProvider(_provider);
                setSigner(_signer);
                setWalletContract(_contract);

                const _owners = await _contract.getOwners();
                setOwners(_owners);

                const _txCount = await _contract.getTransactionCount();
                setTxCount(_txCount.toString());
            } else {
                alert("Install MetaMask!");
            }
        };

        init();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>MultiSig Wallet DApp</h1>

            <h2>Contract Address</h2>
            <p>{CONTRACT_ADDRESS}</p>

            <h2>Owners</h2>
            <ul>
                {owners.map((owner, index) => (
                    <li key={index}>{owner}</li>
                ))}
            </ul>

            <h2>Transaction Count</h2>
            <p>{txCount}</p>
        </div>
    );
}

export default App;
