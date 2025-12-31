const form = document.getElementById("passwordForm");
const list = document.getElementById("passwordList");
const search = document.getElementById("search");

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    site: site.value,
    url: url.value,
    username: username.value,
    password: password.value,
    notes: notes.value
  };

  passwords.push(data);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  form.reset();
  render();
});

function render(filter = "") {
  list.innerHTML = "";
  passwords
    .filter(p => p.site.toLowerCase().includes(filter))
    .forEach((p, i) => {
      list.innerHTML += `
        <div class="card">
          <h3>${p.site}</h3>
          <p><a href="${p.url}" target="_blank">${p.url}</a></p>
          <p>👤 ${p.username}</p>
          <p class="password">🔑 ${"*".repeat(p.password.length)}</p>
          <p>📝 ${p.notes}</p>
        </div>
      `;
    });
}

search.addEventListener("input", e => {
  render(e.target.value.toLowerCase());
});

render();
