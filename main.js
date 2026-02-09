const categoriesEl = document.getElementById("categories");
const subcategoriesEl = document.getElementById("subcategories");
const cardsEl = document.getElementById("cards");

/* Load main categories */
Object.keys(DATA).forEach(categoryKey => {
  const btn = document.createElement("button");
  btn.textContent = DATA[categoryKey].title;
  btn.onclick = () => loadSubcategories(categoryKey);
  categoriesEl.appendChild(btn);
});

function loadSubcategories(categoryKey) {
  subcategoriesEl.innerHTML = "<h3>Subcategories</h3>";
  cardsEl.innerHTML = "";

  const subs = DATA[categoryKey].subcategories;

  Object.keys(subs).forEach(subKey => {
    const btn = document.createElement("button");
    btn.textContent = subs[subKey].title;
    btn.onclick = () => loadTexts(subs[subKey].texts);
    subcategoriesEl.appendChild(btn);
  });
}

function loadTexts(texts) {
  cardsEl.innerHTML = "";

  texts.forEach(text => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p>${text}</p>
      <button onclick="copyText('${text.replace(/'/g, "\\'")}')">Copy</button>
    `;
    cardsEl.appendChild(card);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}
