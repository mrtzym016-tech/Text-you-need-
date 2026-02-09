const cardsContainer = document.getElementById("cards");

// تحويل بيانات الكائنات إلى مصفوفة عامة للعرض
function getAllReplies() {
  const all = [];

  // واتساب
  for (let key in data.whatsapp_general) {
    data.whatsapp_general[key].forEach(text => {
      all.push({ category: 'whatsapp', sub: key, text });
    });
  }

  // اعتراضات
  for (let key in data.objections) {
    data.objections[key].forEach(text => {
      all.push({ category: 'objections', sub: key, text });
    });
  }

  // مواقف محرجة
  for (let key in data.awkward) {
    data.awkward[key].forEach(text => {
      all.push({ category: 'awkward', sub: key, text });
    });
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

// تصفية حسب الزر
function filterCategory(category) {
  if (category === 'all') {
    showCards(getAllReplies());
  } else {
    const filtered = getAllReplies().filter(r => r.category === category);
    showCards(filtered);
  }
}

// أول عرض عند التحميل
showCards(getAllReplies());
