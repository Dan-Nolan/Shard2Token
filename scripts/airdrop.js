const frens = [
    "0x785Ba9bA76F9C2f1c07AEb27C64683Dfa9281cF3", // Allen
    "0xd2eC7b4bCC4019dE53F7f5676427476309Ef38f7", // jimmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    "0x7CEBFF30bD28AfE429303C0c4c4Adfa95c4b52D7", // jacob
    "0xc310B0313C26aA229573879bc8FE935132025AB1", // turner
    "0xaf796D06C7Ffc6231a59adBaF9B1aDf737ECCcA4", //Julissa
    "0x9bD9b811cD100a5BFD552dFf011b4aB5c60BE100", //Chiranjibi
    "0xe15A4F5eA424B540e6B0558105f88c5D39735374", //kevin
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Briań
    "0xb13938afbed97e1F1bb1919aCBb179729aBE9229", // Deche
    "0x3c55F43143e03f7ed329C833eCdE45646F24e6d9",//Pavlos
    "0x1a3ba00bfB567d54B07e6D04f15Fd912307Fe88a", //Nick
    "0xA669d987c8F893Fd53106a5980cf98bdde80b154", // shivali
    "0xdB52bd8213E8eedc3b9F3e3b2087659A8743b344", // vikram
    "0x58fB6832905e329dd2E8c25E5dD835c3758344E0", // dan
];

const tokenAddr = "0x0991bA80c36649844e81cC821939b01e3B692dc0";

async function main() {
  const token = await hre.ethers.getContractAt("SH2Token", tokenAddr);

  for(let i = 0; i < frens.length; i++) {
    const amount = await ethers.utils.parseEther("65");
    await token.transfer(frens[i], amount);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
