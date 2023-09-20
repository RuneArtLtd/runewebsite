import { ethers } from "hardhat";
import { type RuneMinter } from "../typechain-types";

async function main() {
  const isPresale = false;

  const RuneMinter = await ethers.getContractFactory("RuneMinter");
  const runeMinter = RuneMinter.attach(
    "0xe87aE80515eF041f1330930DC85F62A62EB939BD"
  ) as RuneMinter;

  const tx = await runeMinter.togglePresale(isPresale);
  await tx.wait();

  console.log("Presale set to:", isPresale);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
