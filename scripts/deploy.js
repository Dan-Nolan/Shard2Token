async function main() {
  const initialSupply = await ethers.utils.parseEther("1000");
  const SH2Token = await hre.ethers.getContractFactory("SH2Token");
  const token = await SH2Token.deploy(initialSupply);

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
