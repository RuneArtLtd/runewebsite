import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { ethers, upgrades } from "hardhat";
import type { Rune, RuneMinter } from "../typechain-types";
import { MINT_LIST } from "./mintList";

const tree = StandardMerkleTree.of(MINT_LIST, ["address", "uint256"]);

async function main() {
  const Rune = await ethers.getContractFactory("Rune");
  const runeInstance = (await upgrades.deployProxy(Rune, [], {
    initializer: "initialize",
  })) as unknown as Rune;

  const RuneMinter = await ethers.getContractFactory("RuneMinter");
  const runeMinter = (await upgrades.deployProxy(
    RuneMinter,
    [await runeInstance.getAddress(), 20, tree.root, 7884000],
    {
      initializer: "initialize",
    }
  )) as unknown as RuneMinter;
  console.log("rune", await runeInstance.getAddress());
  console.log("runeMinter", await runeMinter.getAddress());
  await runeInstance.setMinter(await runeMinter.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
