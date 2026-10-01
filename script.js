import { OdabranaOprema } from "./components/odabrana-oprema";
import { Oprema } from "./components/oprema";
import { Sekcija } from "./components/sekcija";
import { dohvatiOpremu, promijeniNaslov } from "./services/api-service";

const main = document.querySelector("#glavni-sadrzaj");

main.innerHTML = `
    <h1>Sportska oprema</h1>
    ${Sekcija("Katalog", "<div class='kartice' id='katalog'></div>")}
    ${Sekcija("Odabrano", "<div class='kartice' id='odabrano'></div>")}
`;

const katalog = document.querySelector("#katalog");
const odabrano = document.querySelector("#odabrano");
let oprema = [];
let odabranaOprema = [];

async function ucitajKatalog() {
  katalog.textContent = "Učitavanje kataloga";
  try {
    oprema = await dohvatiOpremu();
    prikaziKatalog();
  } catch {
    katalog.textContent = "Greska kod ucitavanja kataloga";
  }
}

function prikaziKatalog() {
  katalog.innerHTML = oprema.length
    ? oprema
        .map((predmet) => Oprema(predmet, odabranaOprema.includes(predmet.id)))
        .join("")
    : "Nema opreme za prikaz.";
}

katalog.addEventListener("click", async (e) => {
  const gumb = e.target.closest("button[data-id]");

  if (!gumb) return;

  const idOpreme = Number(gumb.dataset.id);
  const action = gumb.dataset.action;

  if (action === "dodaj") {
    const indeks = odabranaOprema.indexOf(idOpreme);
    if (indeks !== -1) {
      odabranaOprema.splice(indeks, 1);
    } else {
      odabranaOprema.push(idOpreme);
    }
  }

  if (action === "patch") {
    const noviNaslov = prompt("Unesite novi naslov:")?.trim();
    if (!noviNaslov) return;

    try {
      const azuriranaOprema = await promijeniNaslov(idOpreme, noviNaslov);

      const opremaZaPromjenu = oprema.find(
        (predmet) => predmet.id === idOpreme,
      );

      opremaZaPromjenu.title = azuriranaOprema.title;
    } catch {
      alert("Doslo je do greske prilikom promjene naslova.");
    }
  }

  prikaziKatalog();
  prikaziOdabranuOpremu();
});

function prikaziOdabranuOpremu() {
  odabrano.innerHTML = OdabranaOprema(
    oprema.filter((predmet) => odabranaOprema.includes(predmet.id)),
  );
}

ucitajKatalog();

//nav
function toggleIzbornik() {
  const otvoren = this.getAttribute("aria-expanded") !== "true";
  const izbornik = document.getElementById(this.getAttribute("aria-controls"));

  this.setAttribute("aria-expanded", String(otvoren));
  this.setAttribute(
    "aria-label",
    otvoren ? "Zatvori izbornik" : "Otvori izbornik",
  );
  izbornik.classList.toggle("otvoren", otvoren);
}

const hamburgerGumb = document.querySelector(".hamburger");
if (hamburgerGumb !== null) {
  hamburgerGumb.addEventListener("click", toggleIzbornik);
}
