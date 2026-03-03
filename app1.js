// ============================================================
//  AMEXPERTS & PARTNERS — app.js  v2
//  Firebase Firestore + GitHub Pages
// ============================================================

// ── 1. FIREBASE CONFIG ── Remplace avec tes vraies clés ──
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
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
      console.log("✅ Firebase Firestore connecté");
    } else {
      console.warn("⚠️  Firebase non configuré — formulaires en mode démo");
    }
  } catch (e) {
    console.warn("Firebase init error:", e.message);
  }
}

// ── 2. NAVBAR ──────────────────────────────────────────────
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Active link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Close on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { if (links) links.classList.remove('open'); });
  });
}

// ── 3. SCROLL ANIMATIONS ───────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ── 4. COUNTER ANIMATION ───────────────────────────────────
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

// ── 5. CONTACT / CONSULTATION FORM ────────────────────────
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

// ── 6. NEWSLETTER ──────────────────────────────────────────
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

// ── 7. BLOG — charge depuis Firestore ou affiche défauts ──
async function loadBlogArticles() {
  const container = document.getElementById('blogContainer');
  if (!container) return;

  const defaults = [
    { icon:'📊', cat:'Finance',       titre:'Structuration financière des PME en Afrique de l\'Ouest', extrait:'Analyse des mécanismes de financement adaptés aux PME africaines dans un contexte de rareté de capital.', date:'2026-02-15' },
    { icon:'🏗️', cat:'Investissement', titre:'Opportunités immobilières au Togo en 2026',              extrait:'Tour d\'horizon des secteurs porteurs et des zones à fort potentiel de valorisation immobilière.',     date:'2026-01-28' },
    { icon:'🤝', cat:'PPP',            titre:'PPP : levier de développement pour les collectivités',    extrait:'Comment les partenariats public-privé peuvent accélérer la mise en place d\'infrastructures.',         date:'2026-01-10' },
  ];

  let articles = defaults;

  if (db) {
    try {
      const snap = await db.collection('articles').orderBy('date','desc').limit(3).get();
      if (!snap.empty) articles = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    } catch { /* use defaults */ }
  }

  container.innerHTML = articles.map(a => `
    <article class="blog-card fade-up">
      <div class="card-img">${a.icon || '📰'}</div>
      <div class="card-body">
        <div class="meta"><span>${a.cat || a.categorie || 'Analyse'}</span> — ${fmt(a.date)}</div>
        <h3>${a.titre}</h3>
        <p>${a.extrait}</p>
        <a href="blog.html" class="read-more">Lire la suite →</a>
      </div>
    </article>`).join('');

  initScrollAnimations();
}

// ── 8. PROJETS FINANCES ────────────────────────────────────
async function loadProjetsFinances() {
  const tbody = document.getElementById('projetsTableBody');
  if (!tbody) return;

  const defaults = [
    { ref:'AM-2025-001', titre:'Complexe agro-industriel',    secteur:'Agro-industrie', montant:'2,5 M€', pays:'Togo',          statut:'open'     },
    { ref:'AM-2025-002', titre:'Résidence haut standing',     secteur:'Immobilier',     montant:'5 M€',   pays:'Côte d\'Ivoire', statut:'progress' },
    { ref:'AM-2024-003', titre:'Parc solaire 10 MW',          secteur:'Énergie',        montant:'12 M€',  pays:'Sénégal',        statut:'closed'   },
    { ref:'AM-2025-004', titre:'Plateforme logistique',       secteur:'Transport',      montant:'8 M€',   pays:'Bénin',          statut:'open'     },
  ];

  let projets = defaults;

  if (db) {
    try {
      const snap = await db.collection('projets_financement').orderBy('date','desc').get();
      if (!snap.empty) projets = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    } catch { /* use defaults */ }
  }

  const labels = { open:'Ouvert', progress:'En cours', closed:'Clôturé' };
  tbody.innerHTML = projets.map(p => `
    <tr>
      <td><strong>${p.ref}</strong></td>
      <td>${p.titre}</td>
      <td>${p.secteur}</td>
      <td><strong>${p.montant}</strong></td>
      <td>${p.pays}</td>
      <td><span class="badge-status ${p.statut}">${labels[p.statut] || p.statut}</span></td>
      <td><a href="mailto:amexpertspartners20@gmail.com?subject=Intérêt projet ${p.ref}" class="btn-purple-outline" style="padding:.35rem .9rem;font-size:.76rem">Exprimer intérêt</a></td>
    </tr>`).join('');
}

// ── 9. LANGUAGE SWITCH ────────────────────────────────────
const i18n = {
  fr: { nav_home:'Accueil', nav_about:'À propos', nav_services:'Nos Services', nav_realisations:'Réalisations', nav_blog:'Actualités', nav_contact:'Contact', cta_consult:'Consultation' },
  en: { nav_home:'Home',    nav_about:'About',    nav_services:'Our Services', nav_realisations:'Projects',     nav_blog:'News',        nav_contact:'Contact', cta_consult:'Consultation' }
};
let lang = localStorage.getItem('amp_lang') || 'fr';

function applyLang(l) {
  lang = l;
  localStorage.setItem('amp_lang', l);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (i18n[l] && i18n[l][k]) el.textContent = i18n[l][k];
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
}

function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(lang);
}

// ── 10. REALISATION FILTER (realisation.html) ────────────
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat || 'all';
      document.querySelectorAll('.realisation-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
}

// ── 11. TOAST NOTIFICATION ────────────────────────────────
function showToast(msg, type = 'success') {
  let el = document.getElementById('notification');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notification';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === 'success' ? 'var(--purple)' : '#c62828';
  el.style.color = '#fff';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 4500);
}

// ── 12. UTILITY ───────────────────────────────────────────
function fmt(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' }); }
  catch { return dateStr; }
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  initNavbar();
  initScrollAnimations();
  animateCounters();
  initContactForm();
  initNewsletterForm();
  loadBlogArticles();
  loadProjetsFinances();
  initLanguage();
  initFilter();
});
