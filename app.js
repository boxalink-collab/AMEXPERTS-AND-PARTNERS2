// ============================================================
//  AMEXPERTS & PARTNERS — app.js v4.0 CORRIGÉ
//  Chargement dynamique complet depuis Firebase Firestore
// ============================================================

// ── FIREBASE CONFIG ──
const firebaseConfig = {
  apiKey: "AIzaSyBZ884tU0oT_bDljeCsPeMB0nOVxzbmfs4",
  authDomain: "amexperts-and-partners.firebaseapp.com",
  projectId: "amexperts-and-partners",
  storageBucket: "amexperts-and-partners.firebasestorage.app",
  messagingSenderId: "659477414372",
  appId: "1:659477414372:web:bea30caf34ce75505187f1"
};

let db = null;

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
      console.log("✅ Firebase Firestore connecté");
    } else {
      console.warn("⚠️  Firebase SDK non chargé");
    }
  } catch (e) {
    console.error("❌ Erreur Firebase:", e.message);
  }
}

// ── NAVBAR ──
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { if (links) links.classList.remove('open'); });
  });
}

// ── SCROLL ANIMATIONS ──
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target   = parseInt(el.dataset.target) || 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const step     = target / (duration / 16);
    let current = 0;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
      }
    });
    observer.observe(el);
  });
}

// ── CONTACT FORM ──
function initContactForm() {
  document.querySelectorAll('#consultationForm').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…';
      btn.disabled = true;

      const data = {
        nom:          form.nom?.value || '',
        email:        form.email?.value || '',
        telephone:    form.telephone?.value || '',
        organisation: form.organisation?.value || '',
        service:      form.service?.value || '',
        message:      form.message?.value || '',
        date:         new Date().toISOString(),
        status:       'nouveau',
        lu:           false
      };

      try {
        if (db) await db.collection('consultations').add(data);
        showToast('✅ Demande envoyée ! Nous vous répondrons sous 24h.', 'success');
        form.reset();
      } catch (err) {
        console.error(err);
        showToast('❌ Erreur lors de l\'envoi. Contactez-nous directement.', 'error');
      } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
    });
  });
}

// ── NEWSLETTER ──
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
      } catch {
        showToast('❌ Erreur — réessayez.', 'error');
      }
    });
  });
}

// ── BLOG (Actualités) - CHARGE DEPUIS FIREBASE ──
async function loadBlogArticles() {
  const container = document.getElementById('blogContainer');
  if (!container) return;

  // ⚠️ On ne touche pas au contenu existant tant que Firebase ne répond pas
  const originalContent = container.innerHTML;

  if (!db) {
    console.warn("Firebase non connecté — contenu statique conservé");
    return; // Garder le contenu HTML statique
  }

  try {
    const isBlogPage = window.location.pathname.includes('blog.html');
    const limit = isBlogPage ? 20 : 3;

    // Essai avec orderBy (nécessite un index Firestore)
    let snap;
    try {
      snap = await db.collection('articles').orderBy('date', 'desc').limit(limit).get();
    } catch (indexErr) {
      console.warn("orderBy échoué (index manquant?), tentative sans tri:", indexErr.message);
      // Fallback : récupérer sans tri si l'index n'existe pas encore
      snap = await db.collection('articles').limit(limit).get();
    }

    if (snap.empty) {
      // Aucun article dans Firebase → on garde le contenu statique de la page
      console.log("Aucun article dans Firebase — contenu statique conservé");
      return;
    }

    const articles = snap.docs.map(doc => {
      const d = doc.data();
      const isHorizontal = isBlogPage;
      return `
        <article class="blog-card fade-up" style="${isHorizontal ? 'display:grid;grid-template-columns:200px 1fr;gap:1.5rem;margin-bottom:1.5rem' : ''}">
          <div class="card-img" style="${isHorizontal ? 'height:200px;' : ''}display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,var(--purple-dark),var(--purple))">
            ${d.image ? `<img src="${d.image}" alt="${d.titre}" style="width:100%;height:100%;object-fit:cover">` : (d.icon || '📰')}
          </div>
          <div class="card-body">
            <div class="meta"><span>${d.cat || d.categorie || 'Analyse'}</span> — ${formatDate(d.date)}</div>
            <h3>${d.titre || ''}</h3>
            <p>${d.extrait || ''}</p>
            <a href="blog.html" class="read-more">Lire la suite →</a>
          </div>
        </article>
      `;
    });

    container.innerHTML = articles.join('');
    initScrollAnimations();
    console.log(`✅ ${snap.size} article(s) chargé(s) depuis Firebase`);

  } catch (error) {
    console.error('Erreur chargement articles:', error);
    // En cas d'erreur → conserver le contenu statique
    container.innerHTML = originalContent;
  }
}

// ── RÉALISATIONS - CHARGE DEPUIS FIREBASE ──
async function loadRealisations() {
  const container = document.querySelector('.realisations-grid');
  if (!container) return;

  const originalContent = container.innerHTML;

  if (!db) {
    console.warn("Firebase non connecté — contenu statique conservé");
    return;
  }

  try {
    // Essai avec orderBy, fallback sans tri
    let snap;
    try {
      snap = await db.collection('realisations_data').orderBy('annee', 'desc').get();
    } catch (indexErr) {
      console.warn("orderBy échoué, fallback sans tri:", indexErr.message);
      snap = await db.collection('realisations_data').get();
    }

    if (snap.empty) {
      console.log("Aucune réalisation dans Firebase — contenu statique conservé");
      return;
    }

    const gradients = {
      'Énergie':         'linear-gradient(135deg,#1a3a2e,#2e7d32)',
      'Immobilier':      'linear-gradient(135deg,#1a2a3e,#1565c0)',
      'Agro-industrie':  'linear-gradient(135deg,#2e1a0a,#8d5524)',
      'Infrastructure':  'linear-gradient(135deg,#1a1a3e,var(--purple-dark))',
      'Logistique':      'linear-gradient(135deg,#1a1a1a,#333)',
      'Tourisme':        'linear-gradient(135deg,#1a2e2a,#00695c)',
      'Finance':         'linear-gradient(135deg,#1a2e3a,#0277bd)',
    };

    // Icônes par secteur
    const icons = {
      'Énergie':         'fas fa-solar-panel',
      'Immobilier':      'fas fa-city',
      'Agro-industrie':  'fas fa-tractor',
      'Infrastructure':  'fas fa-water',
      'Logistique':      'fas fa-warehouse',
      'Tourisme':        'fas fa-hotel',
      'Finance':         'fas fa-chart-line',
    };

    const realisations = snap.docs.map(doc => {
      const d = doc.data();
      const gradient = gradients[d.secteur] || 'linear-gradient(135deg,var(--purple-dark),var(--purple))';
      const icon     = icons[d.secteur] || 'fas fa-briefcase';

      return `
        <div class="realisation-card fade-up" data-cat="${d.secteur || ''}">
          <div class="card-img" style="background:${gradient}">
            ${d.image
              ? `<img src="${d.image}" alt="${d.titre}" style="width:100%;height:100%;object-fit:cover">`
              : `<i class="${icon}"></i>`}
          </div>
          <div class="card-body">
            <div class="tag">${d.secteur || 'Projet'}</div>
            <h3>${d.titre || ''}</h3>
            <p>${d.description || ''}</p>
            <div class="meta">
              <span><i class="fas fa-map-marker-alt"></i> ${d.pays || '—'}</span>
              <span><i class="fas fa-euro-sign"></i> ${d.montant || '—'}</span>
              <span><i class="fas fa-calendar"></i> ${d.annee || '—'}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = realisations.join('');
    initScrollAnimations();
    initFilter(); // Réinitialiser les filtres avec les nouvelles cartes
    console.log(`✅ ${snap.size} réalisation(s) chargée(s) depuis Firebase`);

  } catch (error) {
    console.error('Erreur chargement réalisations:', error);
    container.innerHTML = originalContent;
  }
}

// ── SERVICES - CHARGE DEPUIS FIREBASE ──
async function loadServices() {
  const container = document.querySelector('.services-grid');
  if (!container) return;

  const originalContent = container.innerHTML;

  if (!db) {
    console.warn("Firebase non connecté — contenu statique conservé");
    return;
  }

  try {
    // Essai avec orderBy ordre, fallback sans
    let snap;
    try {
      snap = await db.collection('services_data').orderBy('ordre', 'asc').get();
    } catch (indexErr) {
      snap = await db.collection('services_data').get();
    }

    if (snap.empty) {
      console.log("Aucun service dans Firebase — contenu statique conservé");
      return;
    }

    const services = snap.docs.map(doc => {
      const d = doc.data();
      const points = d.points && Array.isArray(d.points)
        ? d.points.map(p => `<li>${p}</li>`).join('')
        : '';

      return `
        <div class="service-card fade-up" ${d.id ? `id="${d.id}"` : ''}>
          <div class="service-icon">${d.icon || '<i class="fas fa-briefcase"></i>'}</div>
          <h3>${d.titre || ''}</h3>
          <p>${d.description || ''}</p>
          ${points ? `<ul class="service-points" style="margin-top:1rem;padding-left:1.5rem">${points}</ul>` : ''}
        </div>
      `;
    });

    container.innerHTML = services.join('');
    initScrollAnimations();
    console.log(`✅ ${snap.size} service(s) chargé(s) depuis Firebase`);

  } catch (error) {
    console.error('Erreur chargement services:', error);
    container.innerHTML = originalContent;
  }
}

// ── PROJETS FINANCEMENT ──
async function loadProjetsFinances() {
  const tbody = document.getElementById('projetsTableBody');
  if (!tbody) return;

  if (!db) return;

  try {
    let snap;
    try {
      snap = await db.collection('projets_financement').orderBy('date', 'desc').get();
    } catch (indexErr) {
      console.warn("orderBy échoué, fallback sans tri:", indexErr.message);
      snap = await db.collection('projets_financement').get();
    }

    if (snap.empty) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--gray)">📁 Aucun projet en financement pour le moment.</td></tr>';
      return;
    }

    const labels = { open: 'Ouvert', progress: 'En cours', closed: 'Clôturé' };
    tbody.innerHTML = snap.docs.map(doc => {
      const p = doc.data();
      return `
        <tr>
          <td><strong>${p.ref || '—'}</strong></td>
          <td>${p.titre || '—'}</td>
          <td>${p.secteur || '—'}</td>
          <td><strong>${p.montant || '—'}</strong></td>
          <td>${p.pays || '—'}</td>
          <td><span class="badge-status ${p.statut || ''}">${labels[p.statut] || p.statut || '—'}</span></td>
          <td><a href="mailto:amexpertspartners20@gmail.com?subject=Intérêt projet ${p.ref || ''}" class="btn-purple-outline" style="padding:.35rem .9rem;font-size:.76rem">Exprimer intérêt</a></td>
        </tr>
      `;
    }).join('');

    console.log(`✅ ${snap.size} projet(s) chargé(s) depuis Firebase`);

  } catch (error) {
    console.error('Erreur chargement projets:', error);
  }
}

// ── PARTENAIRES ──
async function loadPartenaires() {
  const container = document.querySelector('.partenaires-grid');
  if (!container) return;

  const originalContent = container.innerHTML;

  if (!db) {
    console.warn("Firebase non connecté — contenu statique conservé");
    return;
  }

  try {
    const snap = await db.collection('partenaires_data').get();

    if (snap.empty) {
      console.log("Aucun partenaire dans Firebase — contenu statique conservé");
      return;
    }

    container.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      return `
        <div class="partenaire-card fade-up">
          <div class="logo-area">
            ${d.logo
              ? `<img src="${d.logo}" alt="${d.nom}" style="max-width:100%;height:auto;max-height:80px;object-fit:contain">`
              : '<i class="fas fa-building"></i>'}
          </div>
          <h3>${d.nom || '—'}</h3>
          <p>${d.description || ''}</p>
          <span class="type">${d.type || 'Partenaire'}</span>
        </div>
      `;
    }).join('');

    initScrollAnimations();
    console.log(`✅ ${snap.size} partenaire(s) chargé(s) depuis Firebase`);

  } catch (error) {
    console.error('Erreur chargement partenaires:', error);
    container.innerHTML = originalContent;
  }
}

// ── FILTER (Réalisations) ──
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.textContent.trim();
      document.querySelectorAll('.realisation-card').forEach(card => {
        const cat = card.dataset.cat || card.querySelector('.tag')?.textContent || '';
        card.style.display = (filterValue === 'Tous' || cat.includes(filterValue)) ? '' : 'none';
      });
    });
  });
}

// ── LANGUAGE ──
const i18n = {
  fr: { nav_home:'Accueil', nav_about:'À propos', nav_services:'Nos Services', nav_realisations:'Réalisations', nav_blog:'Actualités' },
  en: { nav_home:'Home',    nav_about:'About',    nav_services:'Our Services', nav_realisations:'Projects',     nav_blog:'News' }
};
let lang = localStorage.getItem('amp_lang') || 'fr';

function applyLang(l) {
  lang = l;
  localStorage.setItem('amp_lang', l);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (i18n[l] && i18n[l][k]) el.textContent = i18n[l][k];
  });
}

function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(lang);
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  let el = document.getElementById('notification');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notification';
    el.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;border-radius:4px;font-size:0.9rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.2);z-index:10000;opacity:0;transition:opacity 0.3s';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === 'success' ? '#7B2D8B' : '#c62828';
  el.style.color = '#fff';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 4500);
}

// ── UTILITY ──
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ── DÉTECTION DE PAGE ──
function loadPageContent() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    loadBlogArticles();
  } else if (page === 'blog.html') {
    loadBlogArticles();
  } else if (page === 'realisation.html') {
    loadRealisations();
  } else if (page === 'service.html') {
    loadServices();
  } else if (page === 'projet_finance.html') {
    loadProjetsFinances();
  } else if (page === 'partenaires.html') {
    loadPartenaires();
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
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
