(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      (t.credentials =
        e.crossOrigin === `use-credentials`
          ? `include`
          : e.crossOrigin === `anonymous`
            ? `omit`
            : `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
function e(e) {
  let t = e.length
    ? e.map((e) => e.title).join(`,`)
    : `Još nema odabrane opreme.`;
  return `
            <div class="kartica">
                <h3>Odabrana oprema: ${e.length}</h3>
                <p>${t}</p>
            </div>
        `;
}
function t(e, t, n = {}) {
  return `
        <button class="gumb ${t}" ${Object.entries(n)
          .map(([e, t]) => `${e}="${t}"`)
          .join(` `)}>
            ${e}
        </button>
    `;
}
function n(e, n) {
  return `
        <div class="kartica">
            <h3>${e.title}</h3>
            <p>Kategorija: ${e.category}</p>
            <p>${Number(e.price).toFixed(2)} USD po komadu</p>
            ${t(n ? `Ukloni` : `Dodaj`, ``, { "data-id": e.id, "data-action": `dodaj` })}
            ${t(`Promijeni naslov`, ``, { "data-id": e.id, "data-action": `patch` })}
            ${t(`Obriši`, ``, { "data-id": e.id, "data-action": `delete` })}
        </div>
    `;
}
function r(e, t) {
  return `
        <section class="section">
            <h2>${e}</h2>
            ${t}
        </section>
    `;
}
var i = `https://dummyjson.com/products/`;
async function a() {
  let e = await fetch(i + `category/sports-accessories`);
  if (!e.ok) throw Error();
  return (await e.json()).products;
}
async function o(e, t) {
  let n = await fetch(i + e, {
    method: `PATCH`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({ title: t }),
  });
  if (!n.ok) throw Error();
  return await n.json();
}
var s = document.querySelector(`#glavni-sadrzaj`);
s.innerHTML = `
    <h1>Sportska oprema</h1>
    ${r(`Katalog`, `<div class='kartice' id='katalog'></div>`)}
    ${r(`Odabrano`, `<div class='kartice' id='odabrano'></div>`)}
`;
var c = document.querySelector(`#katalog`),
  l = document.querySelector(`#odabrano`),
  u = [],
  d = [];
async function f() {
  c.textContent = `Učitavanje kataloga`;
  try {
    ((u = await a()), p());
  } catch {
    c.textContent = `Greska kod ucitavanja kataloga`;
  }
}
function p() {
  c.innerHTML = u.length
    ? u.map((e) => n(e, d.includes(e.id))).join(``)
    : `Nema opreme za prikaz.`;
}
c.addEventListener(`click`, async (e) => {
  let t = e.target.closest(`button[data-id]`);
  if (!t) return;
  let n = Number(t.dataset.id),
    r = t.dataset.action;
  if (r === `dodaj`) {
    let e = d.indexOf(n);
    e === -1 ? d.push(n) : d.splice(e, 1);
  }
  if (r === `patch`) {
    let e = prompt(`Unesite novi naslov:`)?.trim();
    if (!e) return;
    try {
      let t = await o(n, e),
        r = u.find((e) => e.id === n);
      r.title = t.title;
    } catch {
      alert(`Doslo je do greske prilikom promjene naslova.`);
    }
  }
  (p(), m());
});
function m() {
  l.innerHTML = e(u.filter((e) => d.includes(e.id)));
}
f();
function h() {
  let e = this.getAttribute(`aria-expanded`) !== `true`,
    t = document.getElementById(this.getAttribute(`aria-controls`));
  (this.setAttribute(`aria-expanded`, String(e)),
    this.setAttribute(`aria-label`, e ? `Zatvori izbornik` : `Otvori izbornik`),
    t.classList.toggle(`otvoren`, e));
}
var g = document.querySelector(`.hamburger`);
g !== null && g.addEventListener(`click`, h);
