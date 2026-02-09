const container = document.getElementById("cards");

function renderCards(category = "all") {
  container.innerHTML = "";

  TEXTS.filter(item => category === "all" || item.category === category)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <p>${item.text}</p>
        <button class="copy-btn">نسخ الرد</button>
      `;

      card.querySelector(".copy-btn").onclick = () => {
        navigator.clipboard.writeText(item.text);
        alert("تم نسخ الرد ✅");
      };

      container.appendChild(card);
    });
}

function filterCategory(cat) {
  renderCards(cat);
}

renderCards();
