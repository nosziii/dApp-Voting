import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract", function () {
  // Egy aszinkron függvény, ami minden teszt előtt lefut,
  // hogy előkészítse a környezetet.
  async function deployContract() {
    // Lekérjük a szerződés "gyárát".
    const Voting = await ethers.getContractFactory("Voting");
    // Telepítjük a szerződést a helyi hálózatra.
    const votingContract = await Voting.deploy();

    return { votingContract };
  }

  it("Should deploy and set the initial candidates correctly", async function () {
    const { votingContract } = await deployContract();

    // Ellenőrizzük, hogy a két jelölt létrejött-e.
    // A `candidates(1)` a mapping publikus getter függvényét hívja meg.
    const candidate1 = await votingContract.candidates(1);
    expect(candidate1.name).to.equal("Sarkany Lajos");

    const candidate2 = await votingContract.candidates(2);
    expect(candidate2.name).to.equal("Griff Kovacs");
  });

  it("Should allow a user to vote and increment the vote count", async function () {
    const { votingContract } = await deployContract();

    // Szavazunk az első jelöltre (ID: 1).
    const voteTx = await votingContract.vote(1);
    // Megvárjuk, amíg a tranzakció bekerül egy blokkba.
    await voteTx.wait();

    // Lekérdezzük a jelölt frissített adatait.
    const candidate1 = await votingContract.candidates(1);
    // Elvárjuk, hogy a szavazatainak száma 1 legyen.
    expect(candidate1.voteCount).to.equal(1);
  });
});
