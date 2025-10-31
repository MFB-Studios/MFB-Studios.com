const mods = [
  { id: 1, name: "Create+", edition: "java", rating: 5, tags: ["Automation", "Tech"], img: "placeholder-mod.jpg" },
  { id: 2, name: "Backpacks", edition: "bedrock", rating: 4, tags: ["Utility"], img: "placeholder-mod.jpg" },
  { id: 3, name: "OptiFine", edition: "java", rating: 5, tags: ["Performance"], img: "placeholder-mod.jpg" },
  { id: 4, name: "Lucky Blocks", edition: "bedrock", rating: 3, tags: ["Fun"], img: "placeholder-mod.jpg" }
];

function renderMods(containerId, data) {
  const container = document.getElementById(containerId);
  container.innerHTML = data.map(mod => `
    <div class="mod-card">
      <img src="assets/img/${mod.img}" alt="${mod.name}">
      <div class="mod-info">
        <h3>${mod.name}</h3>
        <div class="tags">
          ${mod.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="rating">Star ${mod.rating}.0</div>
        <a href="#" class="btn-small">Download</a>
      </div>
    </div>
  `).join('');
}

function searchMods() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = mods.filter(m => m.name.toLowerCase().includes(query));
  renderMods('modsList', filtered);
  renderMods('featuredMods', filtered.slice(0, 3));
}

function filterMods(edition) {
  const filtered = edition === 'all' ? mods : mods.filter(m => m.edition === edition);
  renderMods('modsList', filtered);
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('active');
});

document.querySelector('.nav-search button').addEventListener('click', () => {
  const search = document.querySelector('.nav-search');
  search.classList.toggle('active');
  if (search.classList.contains('active')) {
    document.getElementById('searchInput').focus();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderMods('featuredMods', mods.slice(0, 3));
  if (document.getElementById('modsList')) renderMods('modsList', mods);
});
