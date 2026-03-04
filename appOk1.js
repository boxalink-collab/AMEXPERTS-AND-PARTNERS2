// ============================================================
//  AMEXPERTS & PARTNERS — app.js v6.0 FINAL BLINDÉ
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBZ884tU0oT_bDljeCsPeMB0nOVxzbmfs4",
  authDomain: "amexperts-and-partners.firebaseapp.com",
  projectId: "amexperts-and-partners",
  storageBucket: "amexperts-and-partners.firebasestorage.app",
  messagingSenderId: "659477414372",
  appId: "1:659477414372:web:bea30caf34ce75505187f1"
};

let db = null;

// ── FIREBASE INIT ──────────────────────────────────────────────
function initFirebase() {
  try {
    if (typeof firebase === 'undefined') { console.warn("Firebase SDK absent"); return; }
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Firestore OK");
  } catch(e) { console.error("Firebase init:", e.message); }
}

// ── HELPER fetch avec fallback sans orderBy ───────────────────
async function getCol(col, orderField, orderDir) {
  if (!db) return null;
  try {
    return await db.collection(col).orderBy(orderField, orderDir||'desc').get();
  } catch(e) {
    console.warn(`orderBy échoué sur '${col}' (${e.code}) — fallback sans tri`);
    try { return await db.collection(col).get(); }
    catch(e2) { console.error(`Lecture '${col}' impossible:`, e2.message); return null; }
  }
}

// ── NAVBAR ─────────────────────────────────────────────────────
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => { if(links) links.classList.remove('open'); })
  );
}

// ── ANIMATIONS fade-up ─────────────────────────────────────────
// IMPORTANT : on force toujours visible après 800ms comme filet de sécurité
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  // Filet de sécurité : si après 800ms l'élément n'est pas visible, on le force
  setTimeout(() => {
    els.forEach(el => el.classList.add('visible'));
  }, 800);

  try {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    els.forEach(el => obs.observe(el));
  } catch(e) {
    // Si IntersectionObserver non supporté, forcer visible immédiatement
    els.forEach(el => el.classList.add('visible'));
  }
}

// ── COUNTERS ───────────────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    // Forcer valeur finale après 2s même sans scroll
    setTimeout(() => { el.textContent = target + suffix; }, 2000);
    try {
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        let cur = 0;
        const step = target / (1800 / 16);
        const tick = () => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.floor(cur) + suffix;
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
      });
      obs.observe(el);
    } catch(e) { el.textContent = target + suffix; }
  });
}

// ── CONTACT FORM ───────────────────────────────────────────────
function initContactForm() {
  document.querySelectorAll('#consultationForm').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…';
      btn.disabled = true;
      const data = {
        nom: form.nom?.value||'', email: form.email?.value||'',
        telephone: form.telephone?.value||'', organisation: form.organisation?.value||'',
        service: form.service?.value||'', message: form.message?.value||'',
        date: new Date().toISOString(), status: 'nouveau', lu: false
      };
      try {
        if (db) await db.collection('consultations').add(data);
        showToast('✅ Demande envoyée ! Nous vous répondrons sous 24h.', 'success');
        form.reset();
      } catch(err) {
        console.error(err);
        showToast('❌ Erreur d\'envoi. Contactez-nous directement.', 'error');
      } finally { btn.innerHTML = orig; btn.disabled = false; }
    });
  });
}

// ── NEWSLETTER ─────────────────────────────────────────────────
function initNewsletterForm() {
  document.querySelectorAll('#newsletterForm').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const emailEl = form.querySelector('input[type="email"]');
      if (!emailEl) return;
      try {
        if (db) await db.collection('newsletter').add({ email: emailEl.value, date: new Date().toISOString() });
        showToast('✅ Inscription confirmée !', 'success');
        form.reset();
      } catch { showToast('❌ Erreur — réessayez.', 'error'); }
    });
  });
}

// ── BLOG ───────────────────────────────────────────────────────
const FALLBACK_ARTICLES = [
  { icon:'📊', cat:'Finance', date:'2026-02-15T00:00:00',
    titre:'Structuration financière des PME en Afrique de l\'Ouest',
    extrait:'Analyse des mécanismes de financement adaptés aux PME africaines dans un contexte de rareté de capital. Les instruments alternatifs comme le financement participatif et les obligations vertes émergent comme des solutions prometteuses.' },
  { icon:'🏗️', cat:'Investissement', date:'2026-01-28T00:00:00',
    titre:'Opportunités immobilières au Togo en 2026',
    extrait:'Tour d\'horizon des secteurs porteurs et des zones à fort potentiel de valorisation dans l\'immobilier togolais. La demande en logements intermédiaires reste fortement sous-servie dans les grandes agglomérations.' },
  { icon:'🤝', cat:'PPP', date:'2026-01-10T00:00:00',
    titre:'PPP : levier de développement pour les collectivités africaines',
    extrait:'Comment les partenariats public-privé peuvent accélérer la mise en place d\'infrastructures structurantes en Afrique de l\'Ouest. Les collectivités disposent d\'atouts sous-exploités pour attirer les capitaux privés.' },
  { icon:'⚡', cat:'Énergie', date:'2025-12-22T00:00:00',
    titre:'Transition énergétique en Afrique : enjeux et financements',
    extrait:'Les énergies renouvelables représentent un marché de plusieurs milliards d\'euros en Afrique subsaharienne. Analyse des schémas de financement et des acteurs clés du secteur.' },
  { icon:'📋', cat:'Réglementation', date:'2025-12-05T00:00:00',
    titre:'Droit OHADA : réformes récentes et impact sur l\'investissement',
    extrait:'Les récentes évolutions du droit OHADA renforcent la sécurité juridique des investissements en Afrique francophone. Quelles implications pour les entreprises étrangères ?' },
  { icon:'🌍', cat:'Macroéconomie', date:'2025-11-18T00:00:00',
    titre:'Perspectives économiques UEMOA 2026 : opportunités et risques',
    extrait:'Analyse des perspectives de croissance dans l\'espace UEMOA pour 2026. Quels secteurs porteurs malgré les tensions géopolitiques régionales et la pression inflationniste ?' },
];

function renderArticles(articles, container, isBlogPage) {
  if (!articles.length) return;
  container.innerHTML = articles.map(d => `
    <article class="blog-card fade-up" ${isBlogPage ? 'style="display:grid;grid-template-columns:200px 1fr;gap:0;margin-bottom:1.5rem"' : ''}>
      <div class="card-img" style="${isBlogPage ? 'min-height:160px;' : ''}display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--purple-dark),var(--purple));overflow:hidden">
        ${d.image ? `<img src="${d.image}" alt="${d.titre||''}" style="width:100%;height:100%;object-fit:cover">` : (d.icon||'📰')}
      </div>
      <div class="card-body">
        <div class="meta"><span>${d.cat||d.categorie||'Analyse'}</span> — ${formatDate(d.date)}</div>
        <h3>${d.titre||''}</h3>
        <p>${d.extrait||''}</p>
        <a href="blog.html" class="read-more">Lire la suite →</a>
      </div>
    </article>
  `).join('');
  // Re-déclencher animations sur les nouvelles cartes
  setTimeout(() => container.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')), 100);
}

async function loadBlogArticles() {
  const container = document.getElementById('blogContainer');
  if (!container) return;
  const isBlogPage = window.location.pathname.includes('blog.html');
  const limit = isBlogPage ? 50 : 3;

  // Afficher le fallback IMMÉDIATEMENT pendant le chargement Firebase
  if (!isBlogPage) renderArticles(FALLBACK_ARTICLES.slice(0,3), container, false);

  if (!db) return;

  try {
    const snap = await getCol('articles', 'date', 'desc');
    if (!snap || snap.empty) {
      if (isBlogPage) {
        container.innerHTML = FALLBACK_ARTICLES.map(d => `
          <article class="blog-card fade-up" style="display:grid;grid-template-columns:200px 1fr;gap:0;margin-bottom:1.5rem">
            <div class="card-img" style="min-height:160px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--purple-dark),var(--purple))">${d.icon||'📰'}</div>
            <div class="card-body">
              <div class="meta"><span>${d.cat}</span> — ${formatDate(d.date)}</div>
              <h3>${d.titre}</h3>
              <p>${d.extrait}</p>
              <a href="#" class="read-more">Lire la suite →</a>
            </div>
          </article>
        `).join('');
        setTimeout(() => container.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')), 100);
      }
      return;
    }
    const docs = snap.docs.map(d => ({id:d.id,...d.data()}))
      .sort((a,b) => (b.date||'').localeCompare(a.date||''))
      .slice(0, limit);
    renderArticles(docs, container, isBlogPage);
    console.log(`✅ ${docs.length} article(s) Firebase`);
  } catch(error) {
    console.error('Erreur blog:', error);
    // Fallback déjà affiché, on ne fait rien
  }
}

// ── RÉALISATIONS ───────────────────────────────────────────────
async function loadRealisations() {
  const container = document.querySelector('.realisations-grid');
  if (!container) return;
  const staticHTML = container.innerHTML;
  if (!db) return;
  try {
    const snap = await getCol('realisations_data', 'annee', 'desc');
    if (!snap || snap.empty) { console.log("Réalisations: Firebase vide, HTML statique conservé"); return; }
    const gradients = {
      'Énergie':'linear-gradient(135deg,#1a3a2e,#2e7d32)',
      'Immobilier':'linear-gradient(135deg,#1a2a3e,#1565c0)',
      'Agro-industrie':'linear-gradient(135deg,#2e1a0a,#8d5524)',
      'Infrastructure':'linear-gradient(135deg,#1a1a3e,#4a0e72)',
      'Logistique':'linear-gradient(135deg,#1a1a1a,#333)',
      'Tourisme':'linear-gradient(135deg,#1a2e2a,#00695c)',
      'Finance':'linear-gradient(135deg,#0d2137,#0277bd)',
    };
    const icons = {
      'Énergie':'fas fa-solar-panel','Immobilier':'fas fa-city','Agro-industrie':'fas fa-tractor',
      'Infrastructure':'fas fa-water','Logistique':'fas fa-warehouse','Tourisme':'fas fa-hotel','Finance':'fas fa-chart-line',
    };
    const docs = snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.annee||0)-(a.annee||0));
    container.innerHTML = docs.map(d => `
      <div class="realisation-card fade-up" data-cat="${d.secteur||''}">
        <div class="card-img" style="background:${gradients[d.secteur]||'linear-gradient(135deg,#4a0e72,#7B2D8B)'};overflow:hidden">
          ${d.image ? `<img src="${d.image}" alt="${d.titre||''}" style="width:100%;height:100%;object-fit:cover">` : `<i class="${icons[d.secteur]||'fas fa-briefcase'}"></i>`}
        </div>
        <div class="card-body">
          <div class="tag">${d.secteur||'Projet'}</div>
          <h3>${d.titre||''}</h3>
          <p>${d.description||''}</p>
          <div class="meta">
            <span><i class="fas fa-map-marker-alt"></i> ${d.pays||'—'}</span>
            <span><i class="fas fa-euro-sign"></i> ${d.montant||'—'}</span>
            <span><i class="fas fa-calendar"></i> ${d.annee||'—'}</span>
          </div>
        </div>
      </div>
    `).join('');
    setTimeout(() => container.querySelectorAll('.fade-up').forEach(el=>el.classList.add('visible')), 100);
    initFilter();
    console.log(`✅ ${docs.length} réalisation(s) Firebase`);
  } catch(error) { console.error('Erreur réalisations:', error); container.innerHTML = staticHTML; }
}

// ── SERVICES ───────────────────────────────────────────────────
async function loadServices() {
  const container = document.querySelector('.services-grid');
  if (!container) return;
  const staticHTML = container.innerHTML;
  if (!db) return;
  try {
    const snap = await getCol('services_data', 'ordre', 'asc');
    if (!snap || snap.empty) { console.log("Services: Firebase vide, HTML statique conservé"); return; }
    container.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      const pts = Array.isArray(d.points) ? d.points.map(p=>`<li>${p}</li>`).join('') : '';
      const iconHTML = d.icon ? (d.icon.trim().startsWith('<') ? d.icon : `<i class="${d.icon}"></i>`) : '<i class="fas fa-briefcase"></i>';
      return `<div class="service-card fade-up"><div class="service-icon">${iconHTML}</div><h3>${d.titre||''}</h3><p>${d.description||''}</p>${pts?`<ul class="service-points" style="margin-top:1rem;padding-left:1.5rem">${pts}</ul>`:''}</div>`;
    }).join('');
    setTimeout(() => container.querySelectorAll('.fade-up').forEach(el=>el.classList.add('visible')), 100);
    console.log(`✅ ${snap.size} service(s) Firebase`);
  } catch(error) { console.error('Erreur services:', error); container.innerHTML = staticHTML; }
}

// ── PROJETS FINANCEMENT ────────────────────────────────────────
async function loadProjetsFinances() {
  const tbody = document.getElementById('projetsTableBody');
  if (!tbody || !db) return;
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem"><i class="fas fa-spinner fa-spin" style="color:var(--purple)"></i> Chargement…</td></tr>';
  try {
    const snap = await getCol('projets_financement', 'date', 'desc');
    if (!snap || snap.empty) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--gray)">📁 Aucun projet pour le moment.</td></tr>';
      return;
    }
    const docs = snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
    const labels = {open:'Ouvert',progress:'En cours',closed:'Clôturé'};
    tbody.innerHTML = docs.map(p => `
      <tr>
        <td><strong>${p.ref||'—'}</strong></td>
        <td>${p.titre||'—'}</td>
        <td>${p.secteur||'—'}</td>
        <td><strong>${p.montant||'—'}</strong></td>
        <td>${p.pays||'—'}</td>
        <td><span class="badge-status ${p.statut||''}">${labels[p.statut]||p.statut||'—'}</span></td>
        <td><a href="mailto:amexpertspartners20@gmail.com?subject=Intérêt projet ${p.ref||''}" class="btn-purple-outline" style="padding:.35rem .9rem;font-size:.76rem">Exprimer intérêt</a></td>
      </tr>
    `).join('');
    console.log(`✅ ${docs.length} projet(s) Firebase`);
  } catch(error) { console.error('Erreur projets:', error); }
}

// ── PARTENAIRES ────────────────────────────────────────────────
async function loadPartenaires() {
  const container = document.querySelector('.partenaires-grid');
  if (!container) return;
  const staticHTML = container.innerHTML;
  if (!db) return;
  try {
    const snap = await db.collection('partenaires_data').get();
    if (!snap || snap.empty) { console.log("Partenaires: Firebase vide, HTML statique conservé"); return; }
    container.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      return `
        <div class="partenaire-card fade-up">
          <div class="logo-area">${d.logo ? `<img src="${d.logo}" alt="${d.nom||''}" style="max-width:100%;max-height:80px;object-fit:contain">` : '<i class="fas fa-building"></i>'}</div>
          <h3>${d.nom||'—'}</h3>
          <p>${d.description||''}</p>
          <span class="type">${d.type||'Partenaire'}</span>
        </div>
      `;
    }).join('');
    setTimeout(() => container.querySelectorAll('.fade-up').forEach(el=>el.classList.add('visible')), 100);
    console.log(`✅ ${snap.size} partenaire(s) Firebase`);
  } catch(error) { console.error('Erreur partenaires:', error); container.innerHTML = staticHTML; }
}

// ── FILTER ─────────────────────────────────────────────────────
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.textContent.trim();
      document.querySelectorAll('.realisation-card').forEach(card => {
        const cat = card.dataset.cat || card.querySelector('.tag')?.textContent || '';
        card.style.display = (f==='Tous' || cat.includes(f)) ? '' : 'none';
      });
    });
  });
}

// ── LANGUAGE ───────────────────────────────────────────────────
const i18n = {
  fr:{nav_home:'Accueil',nav_about:'À propos',nav_services:'Nos Services',nav_realisations:'Réalisations',nav_blog:'Actualités',cta_consult:'Consultation'},
  en:{nav_home:'Home',nav_about:'About',nav_services:'Our Services',nav_realisations:'Projects',nav_blog:'News',cta_consult:'Consult'}
};
let lang = 'fr';
try { lang = localStorage.getItem('amp_lang') || 'fr'; } catch{}

function applyLang(l) {
  lang = l;
  try { localStorage.setItem('amp_lang', l); } catch{}
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (i18n[l]?.[k]) el.textContent = i18n[l][k];
  });
}
function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(lang);
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg, type='success') {
  let el = document.getElementById('notification');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notification';
    el.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;border-radius:4px;font-size:.9rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:10000;opacity:0;transition:opacity .3s;max-width:360px';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type==='success' ? '#7B2D8B' : '#c62828';
  el.style.color = '#fff';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity='0'; }, 4500);
}

// ── UTILITY ────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}); }
  catch { return dateStr; }
}

// ── PAGE ROUTER ────────────────────────────────────────────────
function loadPageContent() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page===''||page==='index.html') loadBlogArticles();
  else if (page==='blog.html')        loadBlogArticles();
  else if (page==='realisation.html') loadRealisations();
  else if (page==='service.html')     loadServices();
  else if (page==='projet_finance.html') loadProjetsFinances();
  else if (page==='partenaires.html') loadPartenaires();
}

// ── BOOT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // PRIORITÉ 1 : rendre tout le contenu visible immédiatement
  // (évite les pages blanches si app.js ou Firebase est lent)
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));

  initFirebase();
  initNavbar();
  initScrollAnimations();
  animateCounters();
  initContactForm();
  initNewsletterForm();
  initLanguage();
  initFilter();
  loadPageContent();
});
