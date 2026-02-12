const container = document.getElementById("articlesContainer");
const adminBtn = document.getElementById("adminBtn");
const modal = document.getElementById("articleModal");

let articles = JSON.parse(localStorage.getItem("articles")) || ARTICLES;

// 🔒 إظهار زر الإدارة فقط إذا أضفت ?admin=123 في الرابط
if (window.location.search.includes("admin=123")) {
  adminBtn.style.display = "inline-block";
}

function saveToStorage() {
  localStorage.setItem("articles", JSON.stringify(articles));
}

function renderArticles() {
  container.innerHTML = "";

  articles.forEach((article, index) => {
    const div = document.createElement("div");
    div.className = "article-card";

    div.innerHTML = `
      <img src="${article.image || ''}" class="article-img">
      <h2>${article.title}</h2>
      <p>${article.content.substring(0, 200)}...</p>
      <button onclick="openArticle(${index})">Read More</button>
    `;

    container.appendChild(div);
  });
}

window.openArticle = function(index) {
  localStorage.setItem("currentArticle", JSON.stringify(articles[index]));
  window.location.href = "article.html";
};

adminBtn.onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("saveArticle").onclick = function() {
  const title = document.getElementById("articleTitle").value;
  const content = document.getElementById("articleContent").value;
  const file = document.getElementById("articleImage").files[0];

  if (!title || !content) return alert("Fill all fields");

  const reader = new FileReader();
  reader.onload = function(e) {
    const newArticle = {
      title,
      content,
      image: e.target.result
    };

    articles.unshift(newArticle);
    saveToStorage();
    renderArticles();
    modal.style.display = "none";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    articles.unshift({ title, content, image: "" });
    saveToStorage();
    renderArticles();
    modal.style.display = "none";
  }
};

renderArticles();
function subscribe() {
  const email = document.getElementById("subscriberEmail").value;
  if (!email.includes("@")) return alert("Enter valid email");

  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  subscribers.push(email);
  localStorage.setItem("subscribers", JSON.stringify(subscribers));

  document.getElementById("subscribeMsg").innerText = "Subscribed successfully!";
}
document.getElementById("searchInput").addEventListener("input", function(e){
  const term = e.target.value.toLowerCase();
  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(term) ||
    a.content.toLowerCase().includes(term)
  );

  container.innerHTML = "";

  filtered.forEach((article, index) => {
    const div = document.createElement("div");
    div.className = "article-card";
    div.innerHTML = `
      <img src="${article.image || ''}" class="article-img">
      <h2>${article.title}</h2>
      <p>${article.content.substring(0, 200)}...</p>
      <button onclick="openArticle(${index})">Read More</button>
    `;
    container.appendChild(div);
  });
});
