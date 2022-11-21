const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, openseaToken } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("UshiMaster Staging Tests", function () {
          let deployer
          let UshiMaster
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              UshiMaster = await ethers.getContract("UshiMaster", deployer)
              OS = await ethers.getContract("0xf4910C763eD4e47A585E2D34baA9A4b611aE448C", deployer)
          })

          const sendValue = ethers.utils.parseEther("0.01")
          it("Changes creator", async function () {
            const sendTxResponse = OS.setCreator({
                to: UshiMaster.address,
                value: sendValue,
            })
              await sendTxResponse.wait(1)
              const withdrawTxResponse = await UshiMaster.withdraw()
              await withdrawTxResponse.wait(1)

              const endingUshiMaster = await UshiMaster.provider.getBalance(UshiMaster.address)
              console.log(endingUshiMaster.toString() + " should equal 0, running assert equal...")
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
