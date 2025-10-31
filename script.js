/* MFB Studios – Mod Hub (Optimized for 5,000 mods) */

// Admin password (CHANGE THIS to your desired password)
const ADMIN_PASSWORD = 'mfbstudios2025';
let isAdminLoggedIn = false;

// Pagination settings
const MODS_PER_PAGE = 12;
let currentPage = 1;
let currentFilter = 'all';
let currentSearchQuery = '';

// Default mods (fallback if localStorage is empty)
const defaultMods = [
    {id:'glowing-ores-addon',name:'Raiyons Glowing Ores Addon',platform:'bedrock',mcVersion:'1.21',modVersion:'v1.0',
     shortDesc:'Makes ores glow in the dark for easier mining in survival worlds.',
     fullDesc:`<p>This addon makes ores luminous, emitting light like torches or light blocks while intact. Light turns off when the ore is punched or broken. Download both RP and BP for full functionality: RP - https://link-hub.net/1207847/glowing-ores-121-mcpe-rp, BP - https://link-center.net/1207847/glowing-ores-121-mcpe-bp.</p>
               <h3>Features:</h3><ul><li>Illuminates ores to reduce mining effort.</li><li>Supports Render Dragon.</li><li>Perfect for survival mining.</li></ul>`,
     category:'Utility',rating:4.7,downloads:10000,updated:'2024-09-08',
     thumbnail:'https://media.forgecdn.net/attachments/420/916/2022-01-06_17.png',
     screenshots:['https://media.forgecdn.net/attachments/1298/628/dada-jpg.jpg','https://media.forgecdn.net/attachments/1320/237/imagen_2025-09-10_210427173-png.png'],
     javaLink:null,bedrockLink:'https://link-center.net/1207847/glowing-ores-121-mcpe-bp'},
    
    {id:'realistic-guns-mod',name:'Realistic Guns Mod',platform:'bedrock',mcVersion:'1.21.90',modVersion:'v2.0',
     shortDesc:'Adds realistic guns with BGMI-style animations, recoil, and effects.',
     fullDesc:`<p>Transform MCPE into an FPS experience with modern weapons. Download both BP and RP for full functionality: BP - https://linkpays.in/SrlNMvxO, RP - https://linkpays.in/I7e8J.</p>
               <h3>Features:</h3><ul><li>Side aiming animations like BGMI/PUBG.</li><li>Smooth reload, recoil, muzzle flash.</li><li>Dynamic SFX and particles.</li><li>Ideal for PvP and survival.</li></ul>`,
     category:'Weapons',rating:4.9,downloads:15000,updated:'2025-06-25',
     thumbnail:'https://i.ytimg.com/vi/VNtszm4pE1Y/maxresdefault.jpg',
     screenshots:['https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnhvMTh4aDNrenJmNWRpbnE5emxrZGZnNG5jZ2phNGxmZjhoMmc2cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HJOhb6lsRpHZH1M2cJ/giphy.gif',
                  'https://i.ytimg.com/vi/M89HkLfc0F4/hq720.jpg'],
     javaLink:null,bedrockLink:'https://linkpays.in/SrlNMvxO'},
    
    {id:'tree-capacitor-mod',name:'Tree Capacitor Mod',platform:'bedrock',mcVersion:'1.21.60',modVersion:'v1.0',
     shortDesc:'Chop entire trees by breaking one log, great for survival.',
     fullDesc:`<p>Vein miner for trees - cut one log to harvest the whole tree. Sometimes lags, but reliable. Download both BP and RP: BP - https://linkpays.in/KR2tNKI, RP - https://linkpays.in/eoEL2ta0.</p>
               <h3>Features:</h3><ul><li>Auto tree mining on hit.</li><li>Tree chopper functionality.</li><li>Best for survival wood gathering.</li></ul>`,
     category:'Utility',rating:4.6,downloads:8000,updated:'2025-04-26',
     thumbnail:'https://i.ytimg.com/vi/6gvYDbRVY2w/maxresdefault.jpg',
     screenshots:['https://media.forgecdn.net/attachments/description/1061535/description_bbd76193-7c86-44b2-9de3-a9ba0613cea0.gif',
                  'https://mcpegold.com/uploads/2025/7/raiyons-tree-chop-capitator-addon-mcpe.jpg'],
     javaLink:null,bedrockLink:'https://linkpays.in/KR2tNKI'},
    
    {id:'bsl-shader',name:'BSL Shader',platform:'bedrock',mcVersion:'1.21.60',modVersion:'v1.0',
     shortDesc:'HD realistic shaders for better graphics in survival.',
     fullDesc:`<p>One of the top Render Dragon shaders for MCPE, similar to Java Edition. Requires patched Minecraft for mobile. Patched MC - https://linkpays.in/Ubcw. Part of top 3 shaders pack.</p>
               <h3>Features:</h3><ul><li>Ultra HD visuals and ray tracing-like effects.</li><li>Wavy water, beautiful skies, no lag on low-end devices.</li><li>Compatible with Render Dragon.</li></ul>`,
     category:'Graphics',rating:4.8,downloads:12000,updated:'2025-03-28',
     thumbnail:'https://cdn.modrinth.com/data/Q1vvjJYV/images/6196a455f84be3071fd99b4dc182694be0e30343.jpeg',
     screenshots:['https://resourcepack.net/fl/images/2020/08/BSL-Shaders-for-minecraft-6.jpg',
                  'https://i.tlauncher.org/images/bsl-shaders-screenshots-4.jpg'],
     javaLink:null,bedrockLink:'https://linkpays.in/xXN0'},
    
    {id:'ore-logger-mod',name:'Ore Logger Mod',platform:'bedrock',mcVersion:'1.21.70',modVersion:'v1.0',
     shortDesc:'Logs ore mining in chat to detect X-ray and enhance fairness.',
     fullDesc:`<p>Logs who mines what ores in server chat, with special messages for rare ores. Great for SMPs to prevent cheating.</p>
               <h3>Features:</h3><ul><li>Chat logs for coal, iron, diamond, etc.</li><li>Bright messages for rare ores like emeralds.</li><li>Anti-Xray tool for servers.</li></ul>`,
     category:'Utility',rating:4.5,downloads:7000,updated:'2025-04-17',
     thumbnail:'https://media.forgecdn.net/attachments/10/643/In-game_chat.jpg',
     screenshots:['https://static.wikia.nocookie.net/minecraftbedrock-edition/images/e/e1/Screenshot_20210317-211327.png',
                  'https://camo.githubusercontent.com/96d4321cbaad50488139588c3753b9b16ea2dbafd0300d9fc89552faa94f63b3/68747470733a2f2f7261772e6769746875622e636f6d2f746f74656d6f2f776174736f6e2f6d61737465722f77696b692f696d616765732f73637265656e73686f74322e706e67'],
     javaLink:null,bedrockLink:'https://linkpays.in/8lEygs08'}
];

// Load mods from localStorage or use defaults
let mods = loadMods();

/* ---------- LocalStorage Functions ---------- */
function saveMods() {
    try {
        localStorage.setItem('mfbMods', JSON.stringify(mods));
        console.log(`✅ ${mods.length} mods saved to localStorage`);
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('⚠️ Storage limit reached! Cannot save more mods. You have reached the maximum capacity.');
        } else {
            console.error('Error saving mods:', error);
        }
    }
}

function loadMods() {
    try {
        const saved = localStorage.getItem('mfbMods');
        if (saved) {
            const loadedMods = JSON.parse(saved);
            console.log(`✅ Loaded ${loadedMods.length} mods from localStorage`);
            return loadedMods;
        }
    } catch (error) {
        console.error('Error loading mods:', error);
    }
    console.log('📦 Using default mods');
    return [...defaultMods];
}

function resetMods() {
    if (confirm('⚠️ Reset all mods to default? This will delete all custom mods!')) {
        mods = [...defaultMods];
        saveMods();
        currentPage = 1;
        renderMods();
        updateExistingModsList();
        alert('✅ Mods reset to default!');
    }
}

function exportMods() {
    const dataStr = JSON.stringify(mods, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mfb-mods-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    alert('✅ Mods exported successfully!');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderMods();
    updateExistingModsList();
    updateModCount();
});

/* ---------- Tabs ---------- */
function showTab(tab) {
    currentFilter = tab;
    currentPage = 1;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderMods();
}

/* ---------- Get Filtered Mods ---------- */
function getFilteredMods() {
    let filtered = mods;
    
    // Apply platform filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(m => m.platform === currentFilter);
    }
    
    // Apply search filter
    if (currentSearchQuery) {
        const query = currentSearchQuery.toLowerCase();
        filtered = filtered.filter(m => 
            m.name.toLowerCase().includes(query) ||
            m.shortDesc.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query)
        );
    }
    
    return filtered;
}

/* ---------- Render Grid with Pagination ---------- */
function renderMods() {
    const grid = document.getElementById('modsGrid');
    const filtered = getFilteredMods();
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / MODS_PER_PAGE);
    const startIndex = (currentPage - 1) * MODS_PER_PAGE;
    const endIndex = startIndex + MODS_PER_PAGE;
    const modsToShow = filtered.slice(startIndex, endIndex);
    
    // Clear grid
    grid.innerHTML = '';
    
    // Render mods
    if (modsToShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;font-size:1.2rem;opacity:0.7;padding:3rem;">No mods found. Try a different search or filter.</p>';
    } else {
        modsToShow.forEach(m => grid.appendChild(createModCard(m)));
    }
    
    // Render pagination
    renderPagination(totalPages, filtered.length);
    
    // Update mod count
    updateModCount();
}

function createModCard(mod) {
    const card = document.createElement('div');
    card.className = 'mod-card';
    card.onclick = () => openModDetail(mod.id);
    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= .5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));
    card.innerHTML = `
        <div class="mod-image"><img src="${mod.thumbnail}" alt="${mod.name}" loading="lazy"></div>
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

/* ---------- Pagination ---------- */
function renderPagination(totalPages, totalMods) {
    let paginationHTML = document.getElementById('pagination');
    
    if (!paginationHTML) {
        paginationHTML = document.createElement('div');
        paginationHTML.id = 'pagination';
        paginationHTML.className = 'pagination';
        document.getElementById('modsSection').appendChild(paginationHTML);
    }
    
    if (totalPages <= 1) {
        paginationHTML.innerHTML = '';
        return;
    }
    
    let html = '<div class="pagination-container">';
    html += `<div class="pagination-info">Showing ${((currentPage - 1) * MODS_PER_PAGE) + 1}-${Math.min(currentPage * MODS_PER_PAGE, totalMods)} of ${totalMods} mods</div>`;
    html += '<div class="pagination-buttons">';
    
    // Previous button
    if (currentPage > 1) {
        html += `<button onclick="changePage(${currentPage - 1})" class="pagination-btn">← Previous</button>`;
    }
    
    // Page numbers
    const maxButtons = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    if (startPage > 1) {
        html += `<button onclick="changePage(1)" class="pagination-btn">1</button>`;
        if (startPage > 2) html += '<span class="pagination-dots">...</span>';
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button onclick="changePage(${i})" class="pagination-btn ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += '<span class="pagination-dots">...</span>';
        html += `<button onclick="changePage(${totalPages})" class="pagination-btn">${totalPages}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<button onclick="changePage(${currentPage + 1})" class="pagination-btn">Next →</button>`;
    }
    
    html += '</div></div>';
    paginationHTML.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    renderMods();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Search ---------- */
function searchMods() {
    currentSearchQuery = document.getElementById('searchInput').value;
    currentPage = 1;
    renderMods();
}

function focusSearch() {
    document.getElementById('searchInput').focus();
    // Optional: Scroll to search bar
    document.querySelector('.search-bar').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- Mod Count ---------- */
function updateModCount() {
    const filtered = getFilteredMods();
    const countElement = document.getElementById('modCount');
    if (countElement) {
        countElement.textContent = `${filtered.length} mod${filtered.length !== 1 ? 's' : ''} available`;
    }
}

/* ---------- Mod Detail ---------- */
function openModDetail(id) {
    const mod = mods.find(m => m.id === id);
    if (!mod) return;
    
    history.pushState({ mod: id }, mod.name, `#${id}`);
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

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating % 1 >= .5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(mod.rating));
    document.getElementById('detailRating').textContent = stars;
    document.getElementById('detailRatingValue').textContent = mod.rating;

    document.getElementById('detailDescription').innerHTML = mod.fullDesc;

    const ss = document.getElementById('detailScreenshots');
    ss.innerHTML = '';
    mod.screenshots.forEach(src => {
        const div = document.createElement('div');
        div.className = 'screenshot';
        div.innerHTML = `<img src="${src}" alt="Screenshot" onclick="openModal('${src}')" loading="lazy">`;
        ss.appendChild(div);
    });

    const btns = document.getElementById('downloadButtons');
    btns.innerHTML = '';
    if (mod.javaLink) {
        const a = document.createElement('a');
        a.href = mod.javaLink;
        a.target = '_blank';
        a.className = 'download-btn java';
        a.innerHTML = '<i class="fas fa-download"></i> Java Edition';
        btns.appendChild(a);
    }
    if (mod.bedrockLink) {
        const a = document.createElement('a');
        a.href = mod.bedrockLink;
        a.target = '_blank';
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
    history.pushState({}, '', window.location.pathname);
}

/* ---------- Admin Panel ---------- */
function openAdmin() {
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    isAdminLoggedIn = false;
}

function checkPassword() {
    const pwd = document.getElementById('adminPassword').value;
    if (pwd === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
    } else {
        alert('❌ Incorrect password!');
    }
}

function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    isAdminLoggedIn = false;
}

document.getElementById('addModForm').addEventListener('submit', e => {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        alert('🔒 Please login first!');
        return;
    }
    
    if (mods.length >= 5000) {
        alert('⚠️ Maximum limit reached! You can only store up to 5,000 mods.');
        return;
    }
    
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
    saveMods();
    renderMods();
    updateExistingModsList();
    e.target.reset();
    alert(`✅ Mod added successfully! Total mods: ${mods.length}/5000`);
});

function updateExistingModsList() {
    const c = document.getElementById('existingMods');
    c.innerHTML = mods.length === 0 ? '<p>No mods added yet.</p>' : '';
    mods.forEach((m, i) => {
        const d = document.createElement('div');
        d.className = 'mod-item';
        d.innerHTML = `<div><strong>${m.name}</strong> <em>(${m.platform.toUpperCase()})</em><br><small>${m.mcVersion} • ${m.modVersion} • ${m.downloads} downloads</small></div>
                     <div class="mod-actions"><button onclick="deleteMod(${i})">Delete</button></div>`;
        c.appendChild(d);
    });
}

function deleteMod(i) {
    if (!isAdminLoggedIn) {
        alert('🔒 Please login first!');
        return;
    }
    if (confirm(`❌ Delete "${mods[i].name}"?`)) {
        mods.splice(i, 1);
        saveMods();
        renderMods();
        updateExistingModsList();
        alert(`✅ Mod deleted! Total mods: ${mods.length}/5000`);
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

