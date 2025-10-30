/* -------------------------------------------------
   MFB Studios – Mod Hub
   Fixed & minimal version – works locally
------------------------------------------------- */

let mods = [
    {
        id: 'dragon-armor',
        name: 'Dragon Armor Mod',
        platform: 'java',
        mcVersion: '1.20.1',
        modVersion: 'v2.1.0',
        shortDesc: 'Craft powerful armor from dragon scales with fire resistance and flight abilities.',
        fullDesc: `<p><strong>Dragon Armor Mod</strong> introduces a new tier of armor crafted from rare dragon scales.</p>
                   <h3>Features</h3>
                   <ul>
                     <li>Full set bonus: Temporary flight</li>
                     <li>Fire & explosion resistance</li>
                     <li>Auto-repair with dragon breath</li>
                   </ul>`,
        category: 'Equipment',
        rating: 4.9,
        downloads: 15234,
        updated: '2025-10-15',
        thumbnail: 'https://via.placeholder.com/640x360?text=Dragon+Armor+Mod',
        screenshots: [
            'https://via.placeholder.com/800x450?text=Armor+Set',
            'https://via.placeholder.com/800x450?text=Flight',
            'https://via.placeholder.com/800x450?text=Farm'
        ],
        javaLink: 'https://www.mediafire.com/file/example/dragon_armor_v2.1.0.jar',
        bedrockLink: null
    }
];

let currentFilter = 'all';

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderMods();
    updateExistingModsList();
});

/* ---------- Tabs ---------- */
function showTab(tab) {
    currentFilter = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderMods();
}

/* ---------- Render Grid ---------- */
function renderMods() {
    const grid = document.getElementById('modsGrid');
    grid.innerHTML = '';
    const list = currentFilter === 'all' ? mods : mods.filter(m => m.platform === currentFilter);
    list.forEach(m => grid.appendChild(createModCard(m)));
}

function createModCard(mod) {
    const card = document.createElement('div');
    card.className = 'mod-card';
    card.onclick = () => openModDetail(mod.id);

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= .5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));

    card.innerHTML = `
        <div class="mod-image"><img src="${mod.thumbnail}" alt="${mod.name}"></div>
        <div class="mod-info">
            <h3 class="mod-title">${mod.name}</h3>
            <p class="mod-desc">${mod.shortDesc}</p>
            <div class="mod-meta">
                <div class="rating"><span class="stars">${stars}</span> ${mod.rating}</div>
                <span>${mod.mcVersion}</span>
            </div>
            <button class="mod-btn">View Details</button>
        </div>`;
    return card;
}

/* ---------- Search ---------- */
function searchMods() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.mod-card').forEach(c => {
        c.style.display = c.textContent.toLowerCase().includes(q) ? 'block' : 'none';
    });
}

/* ---------- Mod Detail ---------- */
function openModDetail(id) {
    const mod = mods.find(m => m.id === id);
    if (!mod) return;

    // hide home
    document.getElementById('home').style.display = 'none';
    document.getElementById('modsSection').style.display = 'none';
    const detail = document.getElementById('modDetail');
    detail.style.display = 'block';

    // fill fields
    document.getElementById('detailTitle').textContent = mod.name;
    document.getElementById('detailDownloads').textContent = mod.downloads.toLocaleString();
    document.getElementById('detailVersion').textContent = mod.modVersion;
    document.getElementById('detailCategory').textContent = mod.category;
    document.getElementById('detailUpdated').textContent = new Date(mod.updated).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    document.getElementById('detailMCVersion').textContent = mod.mcVersion;

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= .5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));
    document.getElementById('detailRating').textContent = stars;
    document.getElementById('detailRatingValue').textContent = mod.rating;

    document.getElementById('detailDescription').innerHTML = mod.fullDesc;

    // screenshots
    const ss = document.getElementById('detailScreenshots');
    ss.innerHTML = '';
    mod.screenshots.forEach(src => {
        const div = document.createElement('div');
        div.className = 'screenshot';
        div.innerHTML = `<img src="${src}" alt="Screenshot" onclick="openModal('${src}')">`;
        ss.appendChild(div);
    });

    // download buttons
    const btns = document.getElementById('downloadButtons');
    btns.innerHTML = '';
    if (mod.javaLink) {
        const a = document.createElement('a');
        a.href = mod.javaLink; a.target = '_blank';
        a.className = 'download-btn java';
        a.innerHTML = '<i class="fas fa-download"></i> Java Edition';
        btns.appendChild(a);
    }
    if (mod.bedrockLink) {
        const a = document.createElement('a');
        a.href = mod.bedrockLink; a.target = '_blank';
        a.className = 'download-btn bedrock';
        a.innerHTML = '<i class="fas fa-download"></i> Bedrock/PE';
        btns.appendChild(a);
    }

    window.scrollTo(0, 0);
}

function closeModDetail() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('modsSection').style.display = 'block';
    document.getElementById('modDetail').style.display = 'none';
}

/* ---------- Admin Panel ---------- */
function openAdmin() { document.getElementById('adminPanel').style.display = 'block'; }
function closeAdmin() { document.getElementById('adminPanel').style.display = 'none'; }

/* ---- Add new mod ---- */
document.getElementById('addModForm').addEventListener('submit', e => {
    e.preventDefault();
    const screenshots = document.getElementById('modScreenshots').value.split(',').map(s => s.trim()).filter(s => s);

    const newMod = {
        id: document.getElementById('modName').value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: document.getElementById('modName').value,
        platform: document.getElementById('modPlatform').value,
        mcVersion: document.getElementById('modVersion').value,
        modVersion: document.getElementById('modModVersion').value,
        shortDesc: document.getElementById('modShortDesc').value,
        fullDesc: document.getElementById('modFullDesc').value,
        category: document.getElementById('modCategory').value,
        rating: 0,
        downloads: 0,
        updated: new Date().toISOString().split('T')[0],
        thumbnail: document.getElementById('modThumbnail').value,
        screenshots: screenshots,
        javaLink: document.getElementById('modJavaLink').value || null,
        bedrockLink: document.getElementById('modBedrockLink').value || null
    };

    mods.push(newMod);
    renderMods();
    updateExistingModsList();
    e.target.reset();
    alert('Mod added!');
});

/* ---- Existing mods list ---- */
function updateExistingModsList() {
    const container = document.getElementById('existingMods');
    container.innerHTML = mods.length === 0 ? '<p>No mods added yet.</p>' : '';
    mods.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'mod-item';
        div.innerHTML = `
            <div><strong>${m.name}</strong> <em>(${m.platform.toUpperCase()})</em><br>
            <small>${m.mcVersion} • ${m.modVersion} • ${m.downloads} downloads</small></div>
            <div class="mod-actions">
                <button onclick="deleteMod(${i})">Delete</button>
            </div>`;
        container.appendChild(div);
    });
}

function deleteMod(i) {
    if (confirm('Delete this mod?')) {
        mods.splice(i, 1);
        renderMods();
        updateExistingModsList();
    }
}

/* ---------- Screenshot Modal ---------- */
function openModal(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('screenshotModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('screenshotModal').style.display = 'none';
}

/* ---------- ESC key ---------- */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (document.getElementById('screenshotModal').style.display === 'flex') closeModal();
        if (document.getElementById('modDetail').style.display === 'block') closeModDetail();
    }
});
