const LemonadeAuction = artifacts.require("LemonadeAuction");

contract("Auction", accounts => {

  describe("createAuction", () => {
  
    it("Should create new auction", async () => {
        let instance = await LemonadeAuction.deployed();
  
        await instance.mint("Green Lemonade", 156);

        await instance.createAuction(0, 100);  
        const auction = await instance.lemonadeIdToAuction(0);
        assert.equal(auction[0], accounts[0]);
        assert.equal(auction[1].toNumber(), 100);
    });

    it("Should only let owner create new auction for own Lemonade", async () => {
        let instance = await LemonadeAuction.deployed();
  
        await instance.mint("Pink Lemonade", 146);
        let other = accounts[1];
      
        //transfer lemonade from owner to another
        await instance.safeTransferFrom(accounts[0], other, 1);

        try{
            //Should not be able to create auction
            await instance.createAuction(1, 100);  
        }catch(error) {
            assert.equal(error, "Error: VM Exception while processing transaction: revert");
        }
    });

  });

  describe("cancelAuction", () => { 
    it("Should cancel auction", async () => {
        let instance = await LemonadeAuction.deployed();
        await instance.cancel(0); 
        const auction = await instance.lemonadeIdToAuction(0); 
        assert.equal(auction[1].toNumber(), 0);
    });
  });

});