/* MFB Studios – Mod Hub (5,000 mods) – v2.0 */
const ADMIN_PASSWORD = 'mfbstudios2025';
let isAdminLoggedIn = false;

const MODS_PER_PAGE = 12;
let currentPage = 1;
let currentFilter = 'all';
let currentSearchQuery = '';

/* ---------- Default Mods ---------- */
const defaultMods = [/* … same as you provided … */];

/* ---------- Storage ---------- */
let mods = loadMods();

function saveMods() {
    try { localStorage.setItem('mfbMods', JSON.stringify(mods)); }
    catch (e) { if (e.name === 'QuotaExceededError') alert('Storage full!'); }
}
function loadMods() {
    try {
        const s = localStorage.getItem('mfbMods');
        return s ? JSON.parse(s) : [...defaultMods];
    } catch { return [...defaultMods]; }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderMods();
    updateExistingModsList();
    updateModCount();
    // URL hash → open detail
    if (location.hash) openModDetail(location.hash.slice(1));
});

/* ---------- Tabs ---------- */
function showTab(tab) {
    currentFilter = tab;
    currentPage = 1;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderMods();
}

/* ---------- Filtering ---------- */
function getFilteredMods() {
    let list = mods;
    if (currentFilter !== 'all') list = list.filter(m => m.platform === currentFilter);
    if (currentSearchQuery) {
        const q = currentSearchQuery.toLowerCase();
        list = list.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.shortDesc.toLowerCase().includes(q) ||
            m.category.toLowerCase().includes(q)
        );
    }
    return list;
}

/* ---------- Render Grid + Pagination ---------- */
function renderMods() {
    const grid = document.getElementById('modsGrid');
    const filtered = getFilteredMods();
    const totalPages = Math.ceil(filtered.length / MODS_PER_PAGE);
    const start = (currentPage - 1) * MODS_PER_PAGE;
    const end = start + MODS_PER_PAGE;
    const pageMods = filtered.slice(start, end);

    grid.innerHTML = pageMods.length
        ? pageMods.map(createModCard).join('')
        : '<p style="grid-column:1/-1;text-align:center;padding:3rem;opacity:.7">No mods found.</p>';

    renderPagination(totalPages, filtered.length);
    updateModCount();
}
function createModCard(mod) {
    const stars = '★'.repeat(Math.floor(mod.rating)) +
        (mod.rating % 1 >= .5 ? '½' : '') +
        '☆'.repeat(5 - Math.ceil(mod.rating));
    return `
    <div class="mod-card" onclick="openModDetail('${mod.id}')">
        <div class="mod-image"><img src="${mod.thumbnail}" alt="${mod.name}" loading="lazy"></div>
        <div class="mod-info">
            <h3 class="mod-title">${mod.name}</h3>
            <p class="mod-desc">${mod.shortDesc}</p>
            <div class="mod-meta">
                <div class="rating"><span class="stars">${stars}</span> ${mod.rating}</div>
                <span>${mod.mcVersion}</span>
            </div>
            <button class="mod-btn">View Details</button>
        </div>
    </div>`;
}

/* ---------- Pagination ---------- */
function renderPagination(totalPages, totalMods) {
    const container = document.getElementById('pagination') ||
        (() => {
            const el = document.createElement('div');
            el.id = 'pagination'; el.className = 'pagination';
            document.getElementById('modsSection').appendChild(el);
            return el;
        })();

    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = `<div class="pagination-container">
        <div class="pagination-info">Showing ${((currentPage-1)*MODS_PER_PAGE)+1}-${Math.min(currentPage*MODS_PER_PAGE,totalMods)} of ${totalMods} mods</div>
        <div class="pagination-buttons">`;

    // Prev
    if (currentPage > 1) html += `<button class="pagination-btn" onclick="changePage(${currentPage-1})">← Previous</button>`;

    const max = 7;
    let start = Math.max(1, currentPage - Math.floor(max/2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);

    if (start > 1) {
        html += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
        if (start > 2) html += '<span class="pagination-dots">...</span>';
    }
    for (let i = start; i <= end; i++) {
        html += `<button class="pagination-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
    }
    if (end < totalPages) {
        if (end < totalPages-1) html += '<span class="pagination-dots">...</span>';
        html += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    if (currentPage < totalPages) html += `<button class="pagination-btn" onclick="changePage(${currentPage+1})">Next →</button>`;
    html += `</div></div>`;
    container.innerHTML = html;
}
function changePage(p) { currentPage = p; renderMods(); window.scrollTo({top:0,behavior:'smooth'}); }

/* ---------- Search ---------- */
function searchMods() {
    currentSearchQuery = document.getElementById('searchInput').value.trim();
    currentPage = 1;
    renderMods();
}
function focusSearch() {
    const el = document.getElementById('searchInput');
    el.focus(); el.scrollIntoView({behavior:'smooth'});
}

/* ---------- Mod Count ---------- */
function updateModCount() {
    const cnt = getFilteredMods().length;
    const el = document.getElementById('modCount');
    if (el) el.textContent = `${cnt} mod${cnt===1?'':'s'} available`;
}

/* ---------- Mod Detail ---------- */
function openModDetail(id) {
    const mod = mods.find(m => m.id === id);
    if (!mod) return;
    history.pushState({mod:id}, mod.name, `#${id}`);

    document.getElementById('home').style.display = 'none';
    document.getElementById('modsSection').style.display = 'none';
    const detail = document.getElementById('modDetail');
    detail.style.display = 'block';

    // fill fields
    document.getElementById('detailTitle').textContent = mod.name;
    document.getElementById('detailDownloads').textContent = mod.downloads.toLocaleString();
    document.getElementById('detailVersion').textContent = mod.modVersion;
    document.getElementById('detailCategory').textContent = mod.category;
    document.getElementById('detailUpdated').textContent = new Date(mod.updated).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
    document.getElementById('detailMCVersion').textContent = mod.mcVersion;

    const stars = '★'.repeat(Math.floor(mod.rating)) + (mod.rating%1>=.5?'½':'') + '☆'.repeat(5-Math.ceil(mod.rating));
    document.getElementById('detailRating').textContent = stars;
    document.getElementById('detailRatingValue').textContent = mod.rating;

    document.getElementById('detailDescription').innerHTML = mod.fullDesc;

    const ss = document.getElementById('detailScreenshots');
    ss.innerHTML = '';
    mod.screenshots.forEach(src => {
        const div = document.createElement('div');
        div.className = 'screenshot';
        div.innerHTML = `<img src="${src}" alt="Screenshot" loading="lazy" onclick="openModal('${src}')">`;
        ss.appendChild(div);
    });

    const btns = document.getElementById('downloadButtons');
    btns.innerHTML = '';
    if (mod.javaLink) {
        const a = document.createElement('a'); a.href = mod.javaLink; a.target='_blank';
        a.className='download-btn java'; a.innerHTML='<i class="fas fa-download"></i> Java Edition';
        btns.appendChild(a);
    }
    if (mod.bedrockLink) {
        const a = document.createElement('a'); a.href = mod.bedrockLink; a.target='_blank';
        a.className='download-btn bedrock'; a.innerHTML='<i class="fas fa-download"></i> Bedrock/PE';
        btns.appendChild(a);
    }

    window.scrollTo(0,0);
}
function closeModDetail() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('modsSection').style.display = 'block';
    document.getElementById('modDetail').style.display = 'none';
    history.pushState({}, '', location.pathname);
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
    if (document.getElementById('adminPassword').value === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        updateExistingModsList();
    } else alert('Incorrect password!');
}
function closeAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
}

/* ---- Add Mod ---- */
document.getElementById('addModForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!isAdminLoggedIn) return alert('Login first');
    if (mods.length >= 5000) return alert('Maximum 5,000 mods reached');

    const screenshots = document.getElementById('modScreenshots').value.split(',').map(s=>s.trim()).filter(Boolean);
    const newMod = {
        id: document.getElementById('modName').value.toLowerCase().replace(/[^a-z0-9]/g,'-'),
        name: document.getElementById('modName').value,
        platform: document.getElementById('modPlatform').value,
        mcVersion: document.getElementById('modVersion').value,
        modVersion: document.getElementById('modModVersion').value,
        shortDesc: document.getElementById('modShortDesc').value,
        fullDesc: document.getElementById('modFullDesc').value,
        category: document.getElementById('modCategory').value,
        rating: 0, downloads: 0,
        updated: new Date().toISOString().split('T')[0],
        thumbnail: document.getElementById('modThumbnail').value,
        screenshots,
        javaLink: document.getElementById('modJavaLink').value || null,
        bedrockLink: document.getElementById('modBedrockLink').value || null
    };
    mods.push(newMod);
    saveMods(); renderMods(); updateExistingModsList();
    e.target.reset();
    alert(`Mod added – total: ${mods.length}/5000`);
});

/* ---- Edit Mod ---- */
let editingIndex = -1;
function editMod(idx) {
    if (!isAdminLoggedIn) return alert('Login first');
    const m = mods[idx];
    editingIndex = idx;

    document.getElementById('editModName').value = m.name;
    document.getElementById('editModPlatform').value = m.platform;
    document.getElementById('editModVersion').value = m.mcVersion;
    document.getElementById('editModModVersion').value = m.modVersion;
    document.getElementById('editModShortDesc').value = m.shortDesc;
    document.getElementById('editModFullDesc').value = m.fullDesc;
    document.getElementById('editModCategory').value = m.category;
    document.getElementById('editModThumbnail').value = m.thumbnail;
    document.getElementById('editModScreenshots').value = m.screenshots.join(', ');
    document.getElementById('editModJavaLink').value = m.javaLink || '';
    document.getElementById('editModBedrockLink').value = m.bedrockLink || '';

    document.getElementById('editModal').style.display = 'block';
}
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    editingIndex = -1;
}
document.getElementById('editModForm').addEventListener('submit', e => {
    e.preventDefault();
    if (editingIndex === -1) return;
    const screenshots = document.getElementById('editModScreenshots').value.split(',').map(s=>s.trim()).filter(Boolean);
    const updated = {
        id: document.getElementById('editModName').value.toLowerCase().replace(/[^a-z0-9]/g,'-'),
        name: document.getElementById('editModName').value,
        platform: document.getElementById('editModPlatform').value,
        mcVersion: document.getElementById('editModVersion').value,
        modVersion: document.getElementById('editModModVersion').value,
        shortDesc: document.getElementById('editModShortDesc').value,
        fullDesc: document.getElementById('editModFullDesc').value,
        category: document.getElementById('editModCategory').value,
        rating: mods[editingIndex].rating,
        downloads: mods[editingIndex].downloads,
        updated: new Date().toISOString().split('T')[0],
        thumbnail: document.getElementById('editModThumbnail').value,
        screenshots,
        javaLink: document.getElementById('editModJavaLink').value || null,
        bedrockLink: document.getElementById('editModBedrockLink').value || null
    };
    mods[editingIndex] = updated;
    saveMods(); renderMods(); updateExistingModsList();
    closeEditModal();
    alert('Mod updated');
});

/* ---- Delete Mod ---- */
function deleteMod(idx) {
    if (!isAdminLoggedIn) return alert('Login first');
    if (confirm(`Delete "${mods[idx].name}"?`)) {
        mods.splice(idx,1);
        saveMods(); renderMods(); updateExistingModsList();
        alert(`Deleted – ${mods.length}/5000`);
    }
}

/* ---- Existing Mods List ---- */
function updateExistingModsList() {
    const container = document.getElementById('existingMods');
    container.innerHTML = mods.length===0 ? '<p>No mods yet.</p>' : '';
    mods.forEach((m,i) => {
        const div = document.createElement('div');
        div.className='mod-item';
        div.innerHTML = `
            <div><strong>${m.name}</strong> <em>(${m.platform.toUpperCase()})</em><br>
                 <small>${m.mcVersion} • ${m.modVersion} • ${m.downloads} downloads</small></div>
            <div class="mod-actions">
                <button onclick="editMod(${i})">Edit</button>
                <button onclick="deleteMod(${i})">Delete</button>
            </div>`;
        container.appendChild(div);
    });
}

/* ---------- Modal (screenshot) ---------- */
function openModal(src){document.getElementById('modalImage').src=src;document.getElementById('screenshotModal').style.display='flex';}
function closeModal(){document.getElementById('screenshotModal').style.display='none';}

/* ---------- ESC key ---------- */
document.addEventListener('keydown', e=>{
    if(e.key==='Escape'){
        if(document.getElementById('screenshotModal').style.display==='flex') closeModal();
        if(document.getElementById('modDetail').style.display==='block') closeModDetail();
        if(document.getElementById('editModal').style.display==='block') closeEditModal();
    }
});

/* ---------- Dark-Mode Toggle (optional) ---------- */
function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');
}
