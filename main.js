const cardsContainer = document.getElementById("cards");

// تحويل جميع البيانات إلى مصفوفة عامة
function getAllReplies() {
  const all = [];

  for (let category in data) {
    for (let sub in data[category]) {
      data[category][sub].forEach(text => {
        all.push({ category, sub, text });
      });
    }
  }

  return all;
}

// عرض البطاقات
function showCards(replies) {
  cardsContainer.innerHTML = '';
  replies.forEach(reply => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p>${reply.text}</p>
      <small>${reply.category} › ${reply.sub}</small>
      <button class="copy-btn" onclick="copyText('${reply.text.replace(/'/g, "\\'")}')">نسخ</button>
    `;
    cardsContainer.appendChild(card);
  });
}

// نسخ النص
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('تم النسخ!'))
    .catch(() => alert('فشل النسخ!'));
}

// تصفية حسب الفئة
function filterCategory(category) {
  if (category === 'all') {
    showCards(getAllReplies());
  } else {
    const filtered = getAllReplies().filter(r => r.category === category);
    showCards(filtered);
  }
}

// عرض الكل عند التحميل
showCards(getAllReplies());
