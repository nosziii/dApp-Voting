# Szavazó dApp (Voting dApp)

Ez egy egyszerű, de teljes körű decentralizált alkalmazás (dApp), ami a Sepolia teszthálózaton fut. A projekt célja a Web3 fejlesztés alapjainak bemutatása, az okosszerződés írásától kezdve a frontend-integrációig.

## Főbb Funkciók

- Felhasználók csatlakozhatnak a MetaMask tárcájukkal.
- Az alkalmazás beolvassa és megjeleníti a jelöltek listáját és a szavazatok aktuális állását a blokkláncról.
- A felhasználók tranzakció küldésével szavazhatnak a kedvenc jelöltjükre.
- A felhasználói felület valós időben frissül a szavazás sikeressége után.

## Felhasznált Technológiák

- **Okosszerződés:** Solidity
- **Fejlesztői Környezet:** Hardhat
- **Blokklánc Interakció:** Ethers.js
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Hálózat:** Sepolia Testnet
- **Node Szolgáltató:** Alchemy

## Helyi Futtatás

A projekt helyi futtatásához kövesd az alábbi lépéseket:

1.  **Klónozd a repository-t:**

    ```bash
    git clone [https://github.com/nosziii/dApp-Voting.git](https://github.com/nosziii/dApp-Voting.git)
    cd dApp-Voting
    ```

2.  **Telepítsd a függőségeket:**

    ```bash
    npm install
    ```

3.  **Hozd létre a `.env` fájlt:**
    Másold le a `.env.example` fájlt (ezt még létre kell hoznod!), és nevezd át `.env`-re. Töltsd ki a saját Alchemy RPC URL-eddel és a MetaMask privát kulcsoddal.

    ```
    SEPOLIA_RPC_URL="YOUR_ALCHEMY_RPC_URL"
    PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"
    ```

4.  **Telepítsd az okosszerződést:**

    ```bash
    npx hardhat run scripts/deploy.ts --network sepolia
    ```

5.  **Frissítsd a frontendet:**
    A telepítés után kapott szerződés címet másold be a `frontend/app.js` fájl `contractAddress` változójába.

6.  **Indítsd el a frontendet:**
    Használd a VS Code "Live Server" kiegészítőjét az `index.html` fájl megnyitásához.

## Élő Szerződés

A projekt okosszerződése a Sepolia teszthálózaton az alábbi címen érhető el és ellenőrizhető:

**https://sepolia.etherscan.io/address/0x34d3139cfd1Ab984DFFc988C89d00384d7928dca#tokentxns**
