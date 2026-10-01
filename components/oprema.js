import { Button } from "./button";

export function Oprema(oprema, odabrana) {
  return `
        <div class="kartica">
            <h3>${oprema.title}</h3>
            <p>Kategorija: ${oprema.category}</p>
            <p>${Number(oprema.price).toFixed(2)} USD po komadu</p>
            ${Button(odabrana ? "Ukloni" : "Dodaj", "", { "data-id": oprema.id, "data-action": "dodaj" })}
            ${Button("Promijeni naslov", "", { "data-id": oprema.id, "data-action": "patch" })}
            ${Button("Obriši", "", { "data-id": oprema.id, "data-action": "delete" })}
        </div>
    `;
}
