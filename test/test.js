const { assert } = require("chai");

describe("SH2Token", function () {
  const initialSupply = ethers.utils.parseEther("1000");
  let token;
  let addr0, addr1;
  beforeEach(async () => {
    const accounts = await ethers.provider.listAccounts();
    addr0 = accounts[0];
    addr1 = accounts[1];
    const SH2Token = await ethers.getContractFactory("SH2Token");
    token = await SH2Token.deploy(initialSupply);
    await token.deployed();
  });

  it("should mint the default sender all the initial supply", async function () {
    const balance = await token.balanceOf(addr0);
    assert.equal(balance.toString(), initialSupply.toString());
  });

  it("should allow us to transfer to someone else", async () => {
    const amount = ethers.utils.parseEther("10");
    await token.transfer(addr1, amount);

    const balance0 = await token.balanceOf(addr0);
    assert.equal(balance0.toString(), ethers.utils.parseEther("990").toString());

    const balance1 = await token.balanceOf(addr1);
    assert.equal(balance1.toString(), amount.toString());
  });

  describe("after approving a token", () => {
    const amount = ethers.utils.parseEther("50");
    beforeEach(async () => {
      await token.approve(addr1, amount);
    });

    it("should not affect the default signers balance", async () => {
      const balance = await token.balanceOf(addr0);
      assert.equal(balance.toString(), initialSupply.toString());
    });

    it("should update the allowances of addr0 for addr1", async () => {
      const allowance = await token.allowance(addr0, addr1);
      assert.equal(allowance.toString(), amount.toString());
    });

    describe("have addr1 spend addr0 tokens", () => {
      beforeEach(async () => {
        const signer1 = await ethers.provider.getSigner(addr1);
        await token.connect(signer1).transferFrom(addr0, addr1, amount);
      });

      it("should affect the default signers balance", async () => {
        const balance = await token.balanceOf(addr0);
        assert.equal(balance.toString(), ethers.utils.parseEther("950"));
      });
    });
  });
});
