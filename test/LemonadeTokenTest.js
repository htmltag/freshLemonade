const LemonadeAuction = artifacts.require("LemonadeAuction");

contract("Lemonade token", accounts => {
  it("First account should be the owner", async () => {
    let instance = await LemonadeAuction.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint", () => {
    it("creates a new Lemonade(Token)", async () => {
      let instance = await LemonadeAuction.deployed();
  
      await instance.mint("Funky Lemonade", 145);
  
      let lemonade = await instance.getLemonade(0);
      assert.deepEqual(lemonade[0], "Funky Lemonade");
      assert.deepEqual(lemonade[1].c, [145]);
    });

    it("allows only owner to mint", async () => {
        let instance = await LemonadeAuction.deployed();
        let other = accounts[1];
      
        await instance.transferOwnership(other);
        try {
            await instance.mint("Ice Lemonade", 138);
        }catch(error){
            assert.equal(error, "Error: VM Exception while processing transaction: revert");
        }
      });

  });



});

