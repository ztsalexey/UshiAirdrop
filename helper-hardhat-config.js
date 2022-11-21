const networkConfig = {
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
        callbackGasLimit: "500000", // 500,000 gas
        openseaToken: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
