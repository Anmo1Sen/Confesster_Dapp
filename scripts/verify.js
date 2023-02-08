const hre = require("hardhat");

const contractAddress = "0x31c3483fB6CC00c8237C0D509AA15Eb2849CE124";

async function main() {
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });

  console.log("Contract verified!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});