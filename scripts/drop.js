const { getNamedAccounts, ethers } = require("hardhat")
const { ID_Diamonds, ID_BWhales, ID_SWhales, ID_4 } = require("../IDSelector")

async function main() {
    const { deployer } = await getNamedAccounts()
    //OS contract for the token 0x495f947276749Ce646f68AC8c248420045cb7b5e
    const ios = await ethers.getContractAt(
        "MyInterface",
        "0x495f947276749Ce646f68AC8c248420045cb7b5e",
        deployer
    )

    const iios = "0x495f947276749Ce646f68AC8c248420045cb7b5e"

    let UshiMaster = await ethers.getContract("UshiMaster", deployer)
    let ushi = UshiMaster.address
    console.log("UshiMaster address is " + ushi)

    const CreatorToUshi = 0

    if (CreatorToUshi == 1) {
        const gasEstimated = await ios.estimateGas.setApprovalForAll(ushi, "1")

        const gasEstimatedSet = await ios.estimateGas.setCreator(ID_4.toString(), ushi)

        const tx4 = await ios.setCreator(ID_4.toString(), ushi, {
            gasLimit: gasEstimatedSet,
        })
        await tx4.wait(1)

        const tx0 = await ios.setApprovalForAll(ushi, "1", {
            gasLimit: gasEstimated,
        })

        await tx0.wait(1)

        const tx1 = await ios.setCreator(ID_Diamonds.toString(), ushi, {
            gasLimit: gasEstimatedSet,
        })
        await tx1.wait(1)

        const tx2 = await ios.setCreator(ID_BWhales.toString(), ushi, {
            gasLimit: gasEstimatedSet,
        })
        await tx2.wait(1)
        const tx3 = await ios.setCreator(ID_SWhales.toString(), ushi, {
            gasLimit: gasEstimatedSet,
        })
        await tx3.wait(1)
    } else {
        const gasEstimatedSet = await UshiMaster.estimateGas.setCreator(
            iios,
            ID_Diamonds.toString(),
            deployer
        )

        const tx1 = await UshiMaster.setCreator(iios, ID_Diamonds.toString(), deployer, {
            gasLimit: gasEstimatedSet,
        })
        await tx1.wait(1)

        const tx2 = await UshiMaster.setCreator(iios, ID_BWhales.toString(), deployer, {
            gasLimit: gasEstimatedSet,
        })
        await tx2.wait(1)
        const tx3 = await UshiMaster.setCreator(iios, ID_SWhales.toString(), deployer, {
            gasLimit: gasEstimatedSet,
        })
        await tx3.wait(1)

        const tx4 = await UshiMaster.setCreator(iios, ID_4.toString(), deployer, {
            gasLimit: gasEstimatedSet,
        })
        await tx4.wait(1)
    }

    const diamonds = await ios.creator(ID_Diamonds.toString())
    const bwhales = await ios.creator(ID_BWhales.toString())
    const swhales = await ios.creator(ID_SWhales.toString())
    const warriors = await ios.creator(ID_4.toString())

    //Confirmation

    if (ushi == diamonds && ushi == bwhales && ushi == swhales && ushi == warriors) {
        console.log("Creator is UshiMaster, proceeding with airdrop")
    } else {
        console.log("Creator is not UshiMaster")
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
