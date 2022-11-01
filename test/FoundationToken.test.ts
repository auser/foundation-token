import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FoundationToken", () => {
  async function deployFoundationToken() {
    const ONE_GWEI = 1_000_000_000;

    const totalAmount = ONE_GWEI * 100;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, nextAccount] = await ethers.getSigners();

    const FoundationToken = await ethers.getContractFactory("FoundationToken");
    const token = await FoundationToken.deploy(totalAmount);

    return { token, totalAmount, owner, otherAccount, nextAccount };
  }

  describe("Deployment", () => {
    it("sets the total amount", async () => {
      const { token } = await loadFixture(deployFoundationToken);

      expect(await token.totalSupply()).to.equal(100_000_000_000);
    });

    it("can transfer to another user from owner", async () => {
      const { token, owner, otherAccount } = await loadFixture(
        deployFoundationToken
      );
      await token.transfer(otherAccount.address, 100, { from: owner.address });
      expect(await token.balanceOf(otherAccount.address)).to.equal(100);
    });

    it("cannot transfer from one to another if it does not have balance", async () => {
      const { token, owner, otherAccount, nextAccount } = await loadFixture(
        deployFoundationToken
      );
      await token.transfer(otherAccount.address, 100, { from: owner.address });
      await expect(
        token.transferFrom(otherAccount.address, nextAccount.address, 200)
      ).to.be.revertedWith("ERC20: insufficient allowance");
    });
  });
});
