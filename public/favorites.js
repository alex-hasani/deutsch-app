let favoriteItems = [];
let libraryRequest = 0;
let favoriteProfileEpoch = 0;
async function favoriteApi(path, body, profile = activeProfile) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(path + separator + 'profile=' + encodeURIComponent(profile), {
    method: body ? 'POST' : 'GET', headers: {'Content-Type':'application/json'},
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) throw new Error('Library request failed');
  const items = await response.json();
  if (!Array.isArray(items)) throw new Error('Invalid library response');
  return items;
}
function showFavoriteFolder(path) {
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('hidden', view.id !== 'videos'));
  document.querySelectorAll('nav button').forEach(button => button.classList.toggle('active', button.dataset.view === 'videos'));
  renderVideos(path);
}
const favoriteDialog = document.createElement('dialog');
favoriteDialog.className = 'favorites-dialog card';
favoriteDialog.setAttribute('aria-labelledby', 'favoritesTitle');
favoriteDialog.innerHTML = '<div class="quiz-dialog-head"><h2 id="favoritesTitle">Favoriten</h2><button type="button" aria-label="Favoriten schließen">×</button></div><div class="favorites-content"></div>';
document.body.append(favoriteDialog);
favoriteDialog.querySelector('button').onclick = () => favoriteDialog.close();
function showFavoriteError(error) { $('#status').textContent = 'Favoriten konnten nicht gespeichert oder geladen werden.'; }
function updateFavoriteStars() {
  document.querySelectorAll('[data-favorite-path]').forEach(button => {
    const selected = favoriteItems.some(item => item.path === button.dataset.favoritePath);
    button.textContent = selected ? '★' : '☆';
    button.setAttribute('aria-pressed', String(selected));
    button.title = selected ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen';
    button.setAttribute('aria-label', button.title + ': ' + button.dataset.favoriteName);
  });
}
function favoriteRow(entry) {
  const row = document.createElement('div');
  row.className = 'favorite-row';
  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'video-item' + (entry.type === 'folder' ? ' folder-item' : '');
  open.textContent = (entry.type === 'folder' ? '\uD83D\uDCC1 ' : entry.type === 'document' ? '\uD83D\uDCC4 ' : '\u25B6 ') + entry.name;
  open.onclick = () => {
    favoriteDialog.close();
    if (entry.type === 'folder') showFavoriteFolder(entry.path);
    else playVideo(encodeURIComponent(entry.path), escape(entry.name)).catch(showFavoriteError);
  };
  const star = document.createElement('button');
  star.type = 'button';
  star.className = 'favorite-star';
  star.dataset.favoritePath = entry.path;
  star.dataset.favoriteName = entry.name;
  star.onclick = async () => {
    const profile = activeProfile, epoch = favoriteProfileEpoch;
    star.disabled = true;
    try {
      const exists = favoriteItems.some(item => item.path === entry.path);
      const updated = await favoriteApi('/api/favorites', {action:exists ? 'remove' : 'add',path:entry.path,type:entry.type}, profile);
      if (profile !== activeProfile || epoch !== favoriteProfileEpoch) return;
      favoriteItems = updated;
      if (favoriteDialog.open) renderFavoriteDialog();
      updateFavoriteStars();
    } catch (error) { showFavoriteError(error); }
    finally { star.disabled = false; }
  };
  row.append(open, star);
  return row;
}
function renderFavoriteDialog() {
  const content = favoriteDialog.querySelector('.favorites-content');
  content.replaceChildren();
  if (!favoriteItems.length) { content.textContent = 'Noch keine Favoriten. Markiere Dateien oder Ordner mit ☆.'; return; }
  const list = document.createElement('div');
  list.className = 'video-list';
  favoriteItems.forEach(entry => {
    const row = favoriteRow(entry);
    const location = document.createElement('small');
    location.className = 'favorite-location meta';
    location.textContent = entry.path;
    row.firstChild.append(location);
    list.append(row);
  });
  content.append(list);
  updateFavoriteStars();
}
async function openFavorites() {
  const profile = activeProfile, epoch = favoriteProfileEpoch;
  try {
    const items = await favoriteApi('/api/favorites', undefined, profile);
    if (profile !== activeProfile || epoch !== favoriteProfileEpoch) return;
    favoriteItems = items;
    renderFavoriteDialog();
    if (!favoriteDialog.open) favoriteDialog.showModal();
  } catch (error) { showFavoriteError(error); }
}
renderVideos = async function(folder = '') {
  videoFolder = folder;
  const request = ++libraryRequest, profile = activeProfile, epoch = favoriteProfileEpoch;
  const host = $('#videos');
  host.innerHTML = '<article class="card"><h2>Bibliothek</h2><p>Lade Ordner…</p></article>';
  try {
    const [entries, items] = await Promise.all([favoriteApi('/api/video-folder?folder=' + encodeURIComponent(folder), undefined, profile), favoriteApi('/api/favorites', undefined, profile)]);
    if (request !== libraryRequest || profile !== activeProfile || epoch !== favoriteProfileEpoch) return;
    favoriteItems = items;
    host.innerHTML = '<article class="card"><h2>Bibliothek</h2><p class="video-path"></p></article>';
    const card = host.firstChild;
    card.querySelector('.video-path').textContent = 'Deutschkurs' + (folder ? ' > ' + folder : '');
    if (folder) {
      const parent = document.createElement('button');
      parent.textContent = '↑ Übergeordneter Ordner';
      parent.onclick = () => renderVideos(folder.split('/').slice(0,-1).join('/'));
      card.append(parent);
    }
    const list = document.createElement('div');
    list.className = 'video-list';
    entries.forEach(entry => list.append(favoriteRow(entry)));
    if (!entries.length) list.textContent = 'Keine Videos in diesem Ordner.';
    card.append(list);
    updateFavoriteStars();
  } catch (error) {
    if (request === libraryRequest && profile === activeProfile && epoch === favoriteProfileEpoch) host.innerHTML = '<article class="card"><h2>Bibliothek</h2><p>Ordner oder Favoriten konnten nicht geladen werden.</p><button onclick="renderVideos(videoFolder)">Erneut versuchen</button></article>';
  }
};
const originalSwitchProfile = switchProfile;
switchProfile = function() { closeVideoPlayer(); favoriteDialog.close(); favoriteItems = []; favoriteProfileEpoch++; const pending = originalSwitchProfile(); renderVideos(videoFolder); return pending; };
$('#profileSelect').onchange = switchProfile;
renderVideos(videoFolder);
