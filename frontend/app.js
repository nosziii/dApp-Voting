// --- BEÁLLÍTÁSOK ---

const contractAddress = "0x34d3139cfd1Ab984DFFc988C89d00384d7928dca";

// IDE MÁSOLD BE AZ ABI-T A VOTING.JSON FÁJLBÓL!
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "candidatesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_candidateId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// --- ALKALMAZÁS LOGIKA ---

const connectWalletBtn = document.getElementById("connectWalletBtn");
const votingSection = document.getElementById("votingSection");
const candidatesContainer = document.getElementById("candidatesContainer");
const statusP = document.getElementById("status");

let provider;
let signer;
let contract;

connectWalletBtn.addEventListener("click", connectWallet);

// 1. Tárca csatlakoztatása
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      statusP.innerText = "Csatlakozás kérése...";
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      initApp();
    } catch (error) {
      console.error(error);
      statusP.innerText = "Hiba a csatlakozás során.";
    }
  } else {
    statusP.innerText = "MetaMask nincs telepítve!";
  }
}

// 2. Alkalmazás inicializálása csatlakozás után
function initApp() {
  connectWalletBtn.style.display = "none";
  votingSection.style.display = "block";
  statusP.innerText = "Sikeresen csatlakozva!";
  updateUI();
}

// 3. Felhasználói felület frissítése az adatokkal
async function updateUI() {
  try {
    candidatesContainer.innerHTML = "Adatok betöltése...";
    let content = "";
    const candidatesCount = await contract.candidatesCount();

    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = await contract.candidates(i);
      content += `
                <div class="candidate">
                    <h3>${candidate.name}</h3>
                    <p>Szavazatok: ${candidate.voteCount.toString()}</p>
                    <button onclick="vote(${i})">Szavazok!</button>
                </div>
            `;
    }
    candidatesContainer.innerHTML = content;
  } catch (error) {
    console.error(error);
    candidatesContainer.innerHTML = "Hiba az adatok betöltése közben.";
  }
}

// 4. Szavazás funkció
async function vote(candidateId) {
  try {
    statusP.innerText = "Szavazat elküldve, várakozás a megerősítésre...";
    const tx = await contract.vote(candidateId);
    await tx.wait(); // Megvárjuk, amíg a tranzakció bekerül egy blokkba

    statusP.innerText = `Sikeres szavazat a(z) ${candidateId}. jelöltre! Az UI frissül...`;
    await updateUI();
  } catch (error) {
    console.error(error);
    statusP.innerText =
      "Hiba a szavazás során. (Lehet, hogy elutasítottad a tranzakciót?)";
  }
}
