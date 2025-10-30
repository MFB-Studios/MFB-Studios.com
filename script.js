// Mod data
let mods = [
    {
        id: 'dragon-armor',
        name: 'Dragon Armor Mod',
        platform: 'java',
        mcVersion: '1.20.1',
        modVersion: 'v2.1.0',
        shortDesc: 'Craft powerful armor from dragon scales with fire resistance and flight abilities.',
        fullDesc: `<p><strong>Dragon Armor Mod</strong> introduces an entirely new tier of armor crafted from rare dragon scales found in the End dimension.</p>
                   <h3>Features:</h3>
                   <ul>
                     <li>Full set bonus: Temporary flight ability</li>
                     <li>Fire and explosion resistance</li>
                     <li>Auto-repair with dragon breath</li>
                     <li>Custom dragon scale farming</li>
                     <li>Compatible with all major modpacks</li>
                   </ul>
                   <h3>How to Obtain:</h3>
                   <p>Defeat the Ender Dragon multiple times to collect scales, or build a dragon farm in the End.</p>`,
        category: 'Equipment',
        rating: 4.9,
        downloads: 15234,
        updated: '2025-10-15',
        thumbnail: 'https://via.placeholder.com/640x360?text=Dragon+Armor+Mod',
        screenshots: [
            'https://via.placeholder.com/800x450?text=Dragon+Armor+Set',
            'https://via.placeholder.com/800x450?text=Flight+Ability',
            'https://via.placeholder.com/800x450?text=Dragon+Farm'
        ],
        javaLink: 'https://www.mediafire.com/file/example/dragon_armor_v2.1.0.jar',
        bedrockLink: null
    },
    // ... (add other mods here - same as before)
    // For brevity, include the rest from the original code
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderMods();
    updateExistingModsList();
});

function showTab(tab) {
    currentFilter = tab;
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderMods();
}

function renderMods() {
    const grid = document.getElementById('modsGrid');
    grid.innerHTML = '';
    const filtered = currentFilter === 'all' ? mods : mods.filter(m => m.platform === currentFilter);
    filtered.forEach(mod => grid.appendChild(createModCard(mod)));
}

function createModCard(mod) {
    const card = document.createElement('div');
    card.className = 'mod-card';
    card.setAttribute('data-type', mod.platform);
    card.onclick = () => openModDetail(mod.id);

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));

    card.innerHTML = `
        <div class="mod-image">
            <img src="${mod.thumbnail}" alt="${mod.name}">
        </div>
        <div class="mod-info">
            <h3 class="mod-title">${mod.name}</h3>
            <p class="mod-desc">${mod.shortDesc}</p>
            <div class="mod-meta">
                <div class="rating">
                    <span class="stars">${stars}</span>
                    <span>${mod.rating}</span>
                </div>
                <span>${mod.mcVersion}</span>
            </div>
            <button class="mod-btn">${mod.name}</button>
        </div>
    `;
    return card;
}

function searchMods() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.mod-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

function openModDetail(id) {
    const mod = mods.find(m => m.id === id);
    if (!mod) return;

    history.pushState({mod: id}, mod.name, `#${id}`);
    document.getElementById('home').style.display = 'none';
    document.getElementById('modsSection').style.display = 'none';
    const detail = document.getElementById('modDetail');
    detail.style.display = 'block';

    document.getElementById('detailTitle').textContent = mod.name;
    document.getElementById('detailDownloads').textContent = mod.downloads.toLocaleString();
    document.getElementById('detailVersion').textContent = mod.modVersion;
    document.getElementById('detailCategory').textContent = mod.category;
    document.getElementById('detailUpdated').textContent = new Date(mod.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('detailMCVersion').textContent = mod.mcVersion;

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));
    document.getElementById('detailRating').textContent = stars;
    document.getElementById('detailRatingValue').textContent = mod.rating;

    document.getElementById('detailDescription').innerHTML = mod.fullDesc;

    const screenshots = document.getElementById('detailScreenshots');
    screenshots.innerHTML = '';
    mod.screenshots.forEach(src => {
        const div = document.createElement('div');
        div.className = 'screenshot';
        div.innerHTML = `<img src="${src}" alt="Screenshot" onclick="openModal('${src}')">`;
        screenshots.appendChild(div);
    });

    const btns = document.getElementById('downloadButtons');
    btns.innerHTML = '';
    if (mod.javaLink) {
        const a = document.createElement('a');
        a.href = mod.javaLink; a.target = '_blank';
        a.className = 'download-btn java';
        a.innerHTML = '<i class="fas fa-download"></i> Download for Java Edition';
        btns.appendChild(a);
    }
    if (mod.bedrockLink) {
        const a = document.createElement('a');
        a.href = mod.bedrockLink; a.target = '_blank';
        a.className = 'download-btn bedrock';
        a.innerHTML = '<i class="fas fa-download"></i> Download for Bedrock/PE';
        btns.appendChild(a);
    }

    window.scrollTo(0, 0);
}

function closeModDetail() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('modsSection').style.display = 'block';
    document.getElementById('modDetail').style.display = 'none';
    history.pushState({}, '', window.location.pathname);
}

window.addEventListener('popstate', e => {
    if (e.state && e.state.mod) openModDetail(e.state.mod);
    else closeModDetail();
});

function openAdmin() { document.getElementById('adminPanel').style.display = 'block'; }
function closeAdmin() { document.getElementById('adminPanel').style.display = 'none'; }

document.getElementById('addModForm').addEventListener('submit', function(e) {
    e.preventDefault();
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
        screenshots: document.getElementById('modScreenshots').value.split(',').map(s => s.trim()).filter(s => s),
        javaLink: document.getElementById('modJavaLink').value || null,
        bedrockLink: document.getElementById('modBedrockLink').value || null
    };
    mods.push(newMod);
    renderMods();
    updateExistingModsList();
    this.reset();
    alert('Mod added!');
});

function updateExistingModsList() {
    const container = document.getElementById('existingMods');
    container.innerHTML = mods.length === 0 ? '<p>No mods added yet.</p>' : '';
    mods.forEach((mod, i) => {
        const item = document.createElement('div');
        item.className = 'mod-item';
        item.innerHTML = `
            <div><strong>${mod.name}</strong> <em>(${mod.platform.toUpperCase()})</em><br>
            <small>${mod.mcVersion} • ${mod.modVersion} • ${mod.downloads} downloads</small></div>
            <div class="mod-actions">
                <button onclick="editMod(${i})">Edit</button>
                <button onclick="deleteMod(${i})">Delete</button>
            </div>`;
        container.appendChild(item);
    });
}

function deleteMod(i) {
    if (confirm('Delete this mod?')) {
        mods.splice(i, 1);
        renderMods();
        updateExistingModsList();
    }
}

function editMod(i) {
    alert('Edit coming soon! Delete and re-add for now.');
}

function openModal(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('screenshotModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('screenshotModal').style.display = 'none';
}

document.getElementById('screenshotModal').addEventListener('click', e => {
    if (e.target === document.getElementById('screenshotModal')) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        if (document.getElementById('modDetail').style.display === 'block') closeModDetail();
    }
});