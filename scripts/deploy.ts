import { ethers } from "ethers";
import fs from "fs";
// import "dotenv/config";

async function main() {

    const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);

    const wallet = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        provider
    );

    const artifact = JSON.parse(
        fs.readFileSync(
            "./artifacts/contracts/PranshuCoin.sol/PranshuCoin.json",
            "utf8"
        )
    );

    const abi = artifact.abi;
    const bytecode = artifact.bytecode;

    const factory = new ethers.ContractFactory(
        abi,
        bytecode,
        wallet
    );
    const pranshuCoin = await factory.deploy();

 
    await pranshuCoin.waitForDeployment();

    console.log(
        "PranshuCoin deployed to:",
        pranshuCoin.target
    );
}

main().catch((error) => {
    console.error(error);
});