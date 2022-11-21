const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, openseaToken } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("UshiMaster Staging Tests", function () {
          describe("UshiMaster", async function () {
              let UshiMaster
              let deployer
              beforeEach(async function () {
                  deployer = (await getNamedAccounts()).deployer
                  await deployments.fixture(["all"])
                  UshiMaster = await ethers.getContract("UshiMaster", deployer)
              })

              describe("constructor", async function () {
                  it("sets the owner correctly", async function () {
                      const response = await UshiMaster.owner()
                      assert.equal(response, deployer)
                  })
              })
          })
      })
