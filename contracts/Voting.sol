// SPDX-License-Identifier: MIT
// Meghatározza a licencet, ez egy jó gyakorlat.
pragma solidity ^0.8.24;
// Megmondja a fordítónak, hogy melyik Solidity verziót használja.

// Ez a szerződésünk fő "teste".
contract Voting {

    // Egy struktúra, amivel a jelöltjeink adatait egyben tudjuk kezelni.
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Egy "mapping", ami egyfajta digitális szótár.
    // Egy szám (ID) alapján visszaad egy Candidate struktúrát.
    // A "public" kulcsszó miatt automatikusan kapunk egy ingyenes "getter" függvényt.
    mapping(uint => Candidate) public candidates;

    // Egyszerűen csak számoljuk, hány jelölt van.
    uint public candidatesCount;

    // A "constructor" egy speciális függvény, ami csak egyszer fut le,
    // amikor a szerződést "telepítjük" a blokkláncra.
    constructor() {
        // Hozzáadunk két alapértelmezett jelöltet a könnyebb tesztelésért.
        addCandidate("Sarkany Lajos");
        addCandidate("Griff Kovacs");
    }

    // Egy belső függvény jelölt hozzáadására.
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // A szavazó függvény. Bárki meghívhatja.
    function vote(uint _candidateId) public {
        // A "require" egy feltételt ellenőriz. Ha nem teljesül,
        // a tranzakció leáll és visszavonódik.
        // Itt azt ellenőrizzük, hogy létezik-e a jelölt, akire szavazni akarnak.
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Ervenytelen jelolt ID!");

        // Növeljük a jelölt szavazatainak számát eggyel.
        candidates[_candidateId].voteCount++;
    }
}