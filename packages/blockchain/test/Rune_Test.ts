import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { ethers, upgrades } from "hardhat";
import type { Rune, RuneMinter } from "../typechain-types";

describe("Rune Materials token", function () {
  async function deployMaterials() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Rune = await ethers.getContractFactory("Rune");
    const runeInstance = (await upgrades.deployProxy(Rune, [], {
      initializer: "initialize",
    })) as unknown as Rune;

    const allowlist = [[otherAccount.address, 1]];

    console.log("allowlist", allowlist);
    const tree = StandardMerkleTree.of(allowlist, ["address", "uint256"]);

    const RuneMinter = await ethers.getContractFactory("RuneMinter");
    const runeMinter = (await upgrades.deployProxy(
      RuneMinter,
      [await runeInstance.getAddress(), tree.root],
      {
        initializer: "initialize",
      }
    )) as unknown as RuneMinter;

    await runeInstance.setMinter(await runeMinter.getAddress());

    return { runeInstance, runeMinter, owner, otherAccount, tree };
  }

  async function getTotalSupply(runeInstance: Rune) {
    const totalSupplyWOOD = await runeInstance.totalSupply(0);
    const totalSupplyCOPPER = await runeInstance.totalSupply(1);
    const totalSupplySILVER = await runeInstance.totalSupply(2);
    const totalSupplyGOLD = await runeInstance.totalSupply(3);
    const totalSupplyMYSTERY = await runeInstance.totalSupply(4);

    return (
      totalSupplyWOOD +
      totalSupplyCOPPER +
      totalSupplySILVER +
      totalSupplyGOLD +
      totalSupplyMYSTERY
    );
  }

  // describe("Public mint (mint)", function () {
  it("Should mint three tokens at random to caller", async function () {
    const { runeInstance, runeMinter, tree, otherAccount } = await loadFixture(
      deployMaterials
    );
    const totalBeforeMinting = await getTotalSupply(runeInstance);
    await runeMinter
      .connect(otherAccount)
      .mint(tree.getProof([otherAccount.address, 1]));

    const totalAfterMinting = await getTotalSupply(runeInstance);
    expect(totalAfterMinting - totalBeforeMinting).to.equal(3);
  });
  //   it("Should default to allow users to mint multiple times", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     const totalBeforeMinting = await getTotalSupply(runeInstance);
  //     await expect(runeInstance.connect(owner).mint()).to.not.be.reverted;
  //     await expect(runeInstance.connect(owner).mint()).to.not.be.reverted;
  //     const totalAfterMinting = await getTotalSupply(runeInstance);
  //     expect(totalAfterMinting - totalBeforeMinting).to.equal(6);
  //   });
  //   it("Should revert if caller calls before 24hours have elapsed if limitMinting is enabled", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     await runeInstance.toggleLimitMinting();

  //     await expect(runeInstance.connect(owner).mint()).to.not.be.reverted;

  //     await expect(runeInstance.connect(owner).mint()).to.be.revertedWith(
  //       "You must wait more time until your next mint."
  //     );
  //   });
  //   it("Should revert once all tokens are minted", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);

  //     await expect(runeInstance.connect(owner).mint()).to.not.be.reverted;
  //     await expect(runeInstance.connect(owner).mint()).to.not.be.reverted;
  //     console.log("minted", await getTotalSupply(runeInstance));

  //     await expect(runeInstance.connect(owner).mint()).to.be.revertedWith(
  //       "All materials have been minted"
  //     );
  //   });
  // });

  // describe("Owner Vesting (batch mint)", function () {
  //   it("Should revert if initial supply not met", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     await expect(
  //       runeInstance.connect(owner).mintBatch(owner.address)
  //     ).to.be.revertedWith("Initial supply not met for token type");
  //   });

  //   it("Should vest initial allocation to minter role", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     await runeInstance.connect(owner).mint();
  //     await runeInstance.connect(owner).mint();
  //     await runeInstance.connect(owner).mintBatch(owner.address);
  //     for (let i = 0; i < 5; i++) {
  //       expect(await runeInstance.totalSupply(i)).to.be.at.least(
  //         await runeInstance.INITIAL_SUPPLIES(i)
  //       );
  //     }
  //   });

  //   it("Should calculate and vest the correct amount for each token", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     await runeInstance.connect(owner).mint();
  //     await runeInstance.connect(owner).mint();

  //     const totalSuppliesBefore = [];
  //     for (let i = 0; i < 5; i++) {
  //       totalSuppliesBefore[i] = await runeInstance.totalSupply(i);
  //     }

  //     await runeInstance.connect(owner).mintBatch(owner.address);

  //     for (let i = 0; i < 5; i++) {
  //       const totalSupplyAfter = await runeInstance.totalSupply(i);
  //       const minted = totalSupplyAfter - totalSuppliesBefore[i];
  //       const expected = Math.floor(
  //         Number(
  //           (await runeInstance.MAX_SUPPLIES(i)) - totalSuppliesBefore[i]
  //         ) / 12
  //       );
  //       expect(minted).to.equal(expected);
  //     }
  //   });

  //   it("Should only vest monthly", async function () {
  //     const { runeInstance, owner } = await loadFixture(deployMaterials);
  //     await runeInstance.connect(owner).mint();
  //     await runeInstance.connect(owner).mint();
  //     await runeInstance.connect(owner).mintBatch(owner.address);
  //     await expect(
  //       runeInstance.connect(owner).mintBatch(owner.address)
  //     ).to.be.revertedWith("Minting can only be performed once a month");

  //     await network.provider.send("evm_increaseTime", [2592000]); //30 days
  //     await network.provider.send("evm_mine");

  //     await expect(runeInstance.connect(owner).mintBatch(owner.address)).to.not
  //       .be.reverted;
  //   });
  // });
});
