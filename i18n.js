/* ================================================================
   i18n.js — FR / EN — AMEXPERTS & PARTNERS
   Inclure dans TOUTES les pages juste avant </body>
   ================================================================ */
(function(){

var D = {
  fr: {
    /* NAV */
    nav_home:'Accueil', nav_about:'À propos', nav_services:'Nos Services',
    nav_real:'Réalisations', nav_blog:'Actualités', nav_options:'Options',
    nav_projets:'Projets en financement', nav_partenaires:'Nos Partenaires',
    nav_brochure:'Brochure Corporate', nav_cta:'Consultation',
    nav_s1:'Rédaction de projets', nav_s2:'Mobilisation de ressources',
    nav_s3:'Formations professionnelles', nav_s4:'Structuration financière',
    nav_s5:'Expertise immobilière', nav_s6:'Expertise industrielle',
    nav_s7:'Expertise en assurance', nav_s8:'Ingénierie juridique',
    /* FOOTER */
    foot_tagline:'Cabinet de conseil et d\'ingénierie de projets. Lomé, Togo.',
    foot_copy:'© 2026 AMEXPERTS AND PARTNERS — Tous droits réservés',
    foot_h_svc:'Services', foot_h_nav:'Navigation', foot_h_contact:'Contact',
    /* COMMUN */
    btn_rdv:'Prendre rendez-vous', btn_consult:'Consulter un expert',
    btn_more:'En savoir plus →', btn_see_all:'Voir toutes',
    loading:'Chargement…',
    /* ── ABOUT ── */
    about_ph_h1:'À propos du cabinet',
    about_ph_p:'Un cabinet pluridisciplinaire fondé sur l\'excellence, l\'intégrité et la vision internationale.',
    about_bc:'À propos',
    about_hist_label:'Notre histoire',
    about_hist_h2:'Nés de l\'Afrique, tournés vers le monde',
    about_hist_p1:'AMEXPERTS AND PARTNERS est un cabinet de conseil et d\'ingénierie de projets basé à Lomé, en République du Togo. Fondé par des experts chevronnés issus de la finance internationale, de l\'ingénierie et du droit des affaires, le cabinet s\'est imposé comme un acteur de référence dans l\'accompagnement de projets d\'envergure en Afrique de l\'Ouest, Centrale et à l\'international.',
    about_hist_p2:'Notre approche combine rigueur analytique, créativité stratégique et maîtrise des réalités locales pour offrir à nos clients des solutions de financement et de structuration à la hauteur de leurs ambitions.',
    about_stat1:'Années d\'expérience', about_stat2:'Projets réalisés', about_stat3:'Pays d\'intervention',
    about_vision_h3:'Notre vision',
    about_vision_q:'« Devenir le cabinet de référence en ingénierie de projets et en structuration financière pour le développement économique de l\'Afrique, en mobilisant les meilleures expertises humaines, techniques et financières. »',
    about_mission_h3:'Notre mission',
    about_mission_p:'Accompagner les entreprises, institutions et investisseurs dans la conception, la structuration et la réalisation de leurs projets, en leur offrant un conseil expert, intègre et orienté résultats.',
    about_val_label:'Ce qui nous guide', about_val_h2:'Nos valeurs fondamentales',
    about_v1_h:'Excellence', about_v1_p:'Nous visons la plus haute qualité dans chaque mission, en mobilisant les meilleurs experts et en appliquant les standards internationaux.',
    about_v2_h:'Intégrité', about_v2_p:'Notre éthique professionnelle est au cœur de toutes nos interventions. Nous traitons chaque dossier avec transparence et honnêteté.',
    about_v3_h:'Innovation', about_v3_p:'Nous développons des solutions créatives et adaptées aux défis spécifiques de chaque client, en anticipant les évolutions des marchés.',
    about_v4_h:'Partenariat', about_v4_p:'Nous construisons des relations durables avec nos clients, fondées sur la confiance, le respect mutuel et la création de valeur partagée.',
    about_v5_h:'Impact africain', about_v5_p:'Nous contribuons activement au développement économique de l\'Afrique en catalysant des investissements structurants et créateurs d\'emplois.',
    about_v6_h:'Confidentialité', about_v6_p:'Toutes nos missions sont traitées avec la plus stricte confidentialité. La protection de vos informations stratégiques est notre priorité.',
    about_team_label:'Notre équipe', about_team_h2:'Des experts à votre service',
    about_team_p:'Une équipe pluridisciplinaire d\'experts en finance, droit, ingénierie et stratégie d\'entreprise au service de vos projets.',
    about_eth_label:'Notre engagement', about_eth_h2:'Éthique & Responsabilité',
    about_eth_p:'AMEXPERTS & PARTNERS s\'engage à exercer son activité dans le strict respect des principes déontologiques et des standards internationaux en matière de lutte contre la corruption, de protection des données et de responsabilité sociale.',
    about_eth1:'Conformité réglementaire', about_eth2:'Protection des données',
    about_eth3:'Conflits d\'intérêts', about_eth4:'Responsabilité sociale',
    about_eth_btn:'Prendre contact',
    /* ── SERVICES ── */
    svc_ph_h1:'Nos Services',
    svc_ph_p:'Une offre intégrée de conseil, d\'ingénierie financière et d\'expertise technique pour concrétiser vos ambitions.',
    svc_bc:'Nos Services',
    svc_s01:'Service 01', svc_s02:'Service 02', svc_s03:'Service 03', svc_s04:'Service 04',
    svc_s05:'Service 05', svc_s06:'Service 06', svc_s07:'Service 07', svc_s08:'Service 08',
    svc_h01:'Rédaction de projets', svc_h02:'Mobilisation de ressources',
    svc_h03:'Formations professionnelles', svc_h04:'Structuration financière & organisationnelle',
    svc_h05:'Expertise immobilière', svc_h06:'Expertise industrielle',
    svc_h07:'Expertise en assurance', svc_h08:'Ingénierie juridique & financière',
    svc_d01:'Nous élaborons des documents stratégiques solides et convaincants pour maximiser vos chances d\'obtenir un financement ou un partenariat.',
    svc_d02:'Nous identifions et structurons les meilleures sources de financement pour vos projets, en nous appuyant sur notre réseau en Afrique et à l\'international.',
    svc_d03:'Des programmes de formation sur-mesure pour renforcer les compétences de vos équipes en finance, gestion de projets et gestion des risques.',
    svc_d04:'Nous optimisons la structure financière et organisationnelle de vos projets et entreprises pour maximiser la performance et attirer les investisseurs.',
    svc_d05:'Nos experts immobiliers certifiés évaluent, auditent et analysent vos actifs immobiliers pour vous donner une image fidèle de leur valeur.',
    svc_d06:'Nous réalisons des audits techniques et évaluations d\'unités industrielles pour vous donner une vision claire de la valeur et des risques de vos actifs.',
    svc_d07:'Nous accompagnons entreprises et institutions dans l\'analyse de leurs risques assurables et la mise en place de couvertures optimales.',
    svc_d08:'Combinaison stratégique du droit, de la finance et de la structuration contractuelle pour sécuriser vos opérations.',
    svc_vis01:'Un dossier qui convainc', svc_vis01p:'Nos experts rédigent des dossiers aux standards internationaux, adaptés aux exigences des bailleurs, banques et investisseurs.',
    svc_vis02:'Des financements sur mesure', svc_vis02p:'Accédez à notre réseau d\'investisseurs institutionnels, fonds d\'investissement et banques partenaires à travers l\'Afrique et l\'Europe.',
    svc_vis03:'Montez en compétences', svc_vis03p:'Nos formateurs experts dispensent des programmes adaptés aux réalités du marché africain et aux standards internationaux.',
    svc_vis04:'Optimisation financière', svc_vis04p:'Business plans dynamiques, cash-flow prévisionnels, TRI et VAN pour décider en toute clarté.',
    svc_vis05:'Valorisation certifiée', svc_vis05p:'Des expertises reconnues par les banques, compagnies d\'assurance et juridictions locales.',
    svc_vis06:'Audit technique industriel', svc_vis06p:'Des évaluations rigoureuses pour sécuriser vos investissements dans les actifs industriels.',
    svc_vis07:'Protégez vos actifs', svc_vis07p:'Des stratégies de couverture adaptées à chaque type de projet et de structure d\'entreprise.',
    svc_vis08:'Sécurité juridique totale', svc_vis08p:'De la structuration initiale à la signature finale : chaque aspect juridique et contractuel est sécurisé.',
    svc_cta_h2:'Prêt à structurer votre projet ?',
    svc_cta_p:'Nos experts analysent gratuitement votre dossier lors d\'un premier entretien confidentiel.',
    svc_extra_label:'Offres complémentaires', svc_extra_h2:'Services additionnels',
    svc_extra_p:'Découvrez nos offres de services complémentaires publiées par notre équipe.',
    /* ── BLOG ── */
    blog_ph_h1:'Actualités & Blog',
    blog_ph_p:'Analyses financières, opportunités d\'investissement, notes économiques et actualités du cabinet.',
    blog_bc:'Actualités & Blog',
    blog_feat_tag:'À la une',
    blog_feat_h3:'Guide 2026 : Financer son projet en Afrique de l\'Ouest',
    blog_feat_p:'Notre guide complet des instruments de financement disponibles pour les entreprises et promoteurs.',
    blog_feat_btn:'Voir nos brochures →',
    blog_cat:'Catégories', blog_nl_title:'Newsletter',
    blog_nl_p:'Recevez nos analyses directement dans votre boîte mail.',
    blog_nl_btn:'S\'inscrire', blog_follow:'Nous suivre',
    blog_cta_h:'Besoin d\'expertise ?',
    blog_cta_p:'Premier entretien gratuit et confidentiel avec un de nos experts.',
    blog_cta_btn:'Prendre RDV',
    blog_consult:'Consulter un expert',
    /* ── RÉALISATIONS ── */
    real_ph_h1:'Nos Réalisations',
    real_ph_p:'Un portefeuille de projets concrets illustrant notre expertise et notre engagement pour le développement de l\'Afrique.',
    real_bc:'Réalisations',
    real_f_all:'Tous', real_f_energy:'Énergie', real_f_immo:'Immobilier',
    real_f_agro:'Agro-industrie', real_f_finance:'Finance', real_f_infra:'Infrastructure',
    real_portfolio_label:'Portfolio de projets', real_portfolio_h2:'Études de cas',
    real_stat1:'Projets réalisés', real_stat2:'Pays couverts',
    real_stat3:'Financements mobilisés', real_stat4:'Secteurs couverts',
    real_temoign_label:'Ce que disent nos clients', real_temoign_h2:'Témoignages',
    real_cta_h2:'Votre projet sera notre prochaine réussite',
    real_cta_p:'Contactez-nous pour discuter de votre projet et obtenir une analyse préliminaire gratuite.',
    /* ── PARTENAIRES ── */
    part_ph_h1:'Partenariats Stratégiques',
    part_ph_p:'Construisons ensemble des alliances durables pour démultiplier l\'impact de vos projets en Afrique et à l\'international.',
    part_bc:'Nos Partenaires',
    part_intro_label:'Notre approche partenariale',
    part_intro_h2:'Des alliances stratégiques au service du développement',
    part_intro_p1:'AMEXPERTS & PARTNERS croit profondément que la coopération stratégique est le levier le plus puissant pour accélérer le développement économique de l\'Afrique.',
    part_intro_p2:'Que vous soyez une institution financière, un cabinet d\'experts, un fonds d\'investissement ou une ONG, nous sommes ouverts à explorer des formes de collaboration adaptées à vos objectifs.',
    part_intro_btn:'Proposer un partenariat',
    part_types_label:'Formes de collaboration', part_types_h2:'Types de partenariats proposés',
    part_t1:'Joint-Venture', part_t1p:'Création d\'entités communes pour structurer et réaliser des projets d\'envergure nécessitant des compétences pluridisciplinaires complémentaires.',
    part_t2:'Partenariat Public-Privé (PPP)', part_t2p:'Montage et accompagnement de PPP pour le développement d\'infrastructures, de services publics délégués et d\'équipements collectifs.',
    part_t3:'Memorandum of Understanding', part_t3p:'Formalisation d\'accords de coopération, d\'échanges de compétences et de référencement mutuel avec des partenaires stratégiques.',
    part_t4:'Accords techniques', part_t4p:'Collaboration sur des expertises techniques complémentaires : ingénierie, audit, conseil juridique, expertise sectorielle.',
    part_t5:'Accords financiers', part_t5p:'Structuration de co-financement, partage de risques et mise en commun de capacités de mobilisation financière.',
    part_t6:'Réseaux d\'experts', part_t6p:'Intégration dans notre réseau d\'experts référencés pour intervenir en appui sur des missions ponctuelles ou récurrentes.',
    part_eco_label:'Notre écosystème', part_eco_h2:'Partenaires & Collaborateurs',
    part_eco_p:'Nous collaborons avec un réseau sélectionné d\'institutions et d\'experts partageant nos valeurs d\'excellence et d\'intégrité.',
    part_join_label:'Nous rejoindre', part_join_h2:'Proposer un partenariat',
    part_p1:'Institutions Bancaires', part_p2:'Fonds d\'Investissement',
    part_p3:'Cabinets Juridiques', part_p4:'Bureaux d\'Ingénierie',
    part_p5:'ONG & Coopération', part_p6:'Compagnies d\'Assurance',
    part_join_p:'Vous souhaitez collaborer avec AMEXPERTS & PARTNERS ? Décrivez votre organisation et votre proposition de valeur.',
    /* ── PROJETS FINANCEMENT ── */
    proj_ph_h1:'Projets en Recherche de Financement',
    proj_ph_p:'Un portefeuille de projets sélectionnés, structurés et accompagnés par notre cabinet, ouverts à l\'investissement.',
    proj_bc:'Projets en financement',
    proj_disclaimer:'Les projets présentés sont accompagnés par AMEXPERTS & PARTNERS dans leur processus de structuration et de recherche de financement. Toute expression d\'intérêt sera traitée de manière confidentielle. Les informations détaillées sont transmises aux investisseurs qualifiés sous accord de confidentialité.',
    proj_submit_label:'Vous avez un projet ?', proj_submit_h2:'Soumettre un projet à financer',
    proj_submit_p:'Vous êtes porteur d\'un projet et recherchez un financement ? Soumettez-le à notre équipe pour une analyse préliminaire gratuite.',
    proj_btn_interest:'Exprimer mon intérêt', proj_btn_discuss:'Discuter avec un expert',
    proj_submit_btn:'Soumettre mon projet',
    /* ── BROCHURE ── */
    broch_ph_h1:'Brochure Corporate',
    broch_ph_p:'Téléchargez notre documentation officielle pour en savoir plus sur notre cabinet et nos services.',
    broch_bc:'Brochure Corporate',
    broch_dl_label:'Téléchargements', broch_dl_h2:'Notre documentation officielle',
    broch_dl_p:'Retrouvez l\'ensemble de notre documentation institutionnelle pour vous informer sur nos expertises, nos références et nos offres de service.',
    broch_info:'Les documents sont transmis par email sur demande. Cliquez sur "Demander" pour envoyer une requête à notre équipe.',
    broch_contact_label:'Contact direct', broch_contact_h2:'Besoin d\'informations supplémentaires ?',
    broch_contact_p:'Notre équipe est disponible pour répondre à toutes vos questions et vous fournir les documents dont vous avez besoin.',
    broch_email:'Envoyer un email', broch_rdv:'Prendre RDV',
  },
  en: {
    /* NAV */
    nav_home:'Home', nav_about:'About', nav_services:'Our Services',
    nav_real:'Projects', nav_blog:'News', nav_options:'More',
    nav_projets:'Projects for funding', nav_partenaires:'Our Partners',
    nav_brochure:'Corporate Brochure', nav_cta:'Consult',
    nav_s1:'Project writing', nav_s2:'Resource mobilization',
    nav_s3:'Professional training', nav_s4:'Financial structuring',
    nav_s5:'Real estate expertise', nav_s6:'Industrial expertise',
    nav_s7:'Insurance expertise', nav_s8:'Legal engineering',
    /* FOOTER */
    foot_tagline:'Advisory and project engineering firm. Lomé, Togo.',
    foot_copy:'© 2026 AMEXPERTS AND PARTNERS — All rights reserved',
    foot_h_svc:'Services', foot_h_nav:'Navigation', foot_h_contact:'Contact',
    /* COMMUN */
    btn_rdv:'Book an appointment', btn_consult:'Consult an expert',
    btn_more:'Learn more →', btn_see_all:'View all',
    loading:'Loading…',
    /* ── ABOUT ── */
    about_ph_h1:'About the firm',
    about_ph_p:'A multidisciplinary firm built on excellence, integrity and international vision.',
    about_bc:'About',
    about_hist_label:'Our story',
    about_hist_h2:'Born in Africa, open to the world',
    about_hist_p1:'AMEXPERTS AND PARTNERS is an advisory and project engineering firm based in Lomé, Republic of Togo. Founded by seasoned experts in international finance, engineering and business law, the firm has established itself as a reference player in supporting major projects across West and Central Africa and internationally.',
    about_hist_p2:'Our approach combines analytical rigour, strategic creativity and mastery of local realities to offer our clients financing and structuring solutions equal to their ambitions.',
    about_stat1:'Years of experience', about_stat2:'Projects completed', about_stat3:'Countries covered',
    about_vision_h3:'Our vision',
    about_vision_q:'"To become the reference firm in project engineering and financial structuring for Africa\'s economic development, by mobilising the best human, technical and financial expertise."',
    about_mission_h3:'Our mission',
    about_mission_p:'To support businesses, institutions and investors in designing, structuring and delivering their projects, offering expert, ethical and results-oriented advice.',
    about_val_label:'What guides us', about_val_h2:'Our core values',
    about_v1_h:'Excellence', about_v1_p:'We aim for the highest quality in every assignment, mobilising the best experts and applying international standards.',
    about_v2_h:'Integrity', about_v2_p:'Professional ethics is at the heart of all our work. We handle every file with transparency and honesty.',
    about_v3_h:'Innovation', about_v3_p:'We develop creative solutions tailored to each client\'s specific challenges, anticipating market developments.',
    about_v4_h:'Partnership', about_v4_p:'We build lasting relationships with our clients, based on trust, mutual respect and shared value creation.',
    about_v5_h:'African impact', about_v5_p:'We actively contribute to Africa\'s economic development by catalysing structural investments and job creation.',
    about_v6_h:'Confidentiality', about_v6_p:'All our assignments are handled with the strictest confidentiality. Protecting your strategic information is our priority.',
    about_team_label:'Our team', about_team_h2:'Experts at your service',
    about_team_p:'A multidisciplinary team of finance, legal, engineering and business strategy experts at the service of your projects.',
    about_eth_label:'Our commitment', about_eth_h2:'Ethics & Responsibility',
    about_eth_p:'AMEXPERTS & PARTNERS is committed to operating in strict compliance with ethical principles and international standards regarding anti-corruption, data protection and social responsibility.',
    about_eth1:'Regulatory compliance', about_eth2:'Data protection',
    about_eth3:'Conflicts of interest', about_eth4:'Social responsibility',
    about_eth_btn:'Get in touch',
    /* ── SERVICES ── */
    svc_ph_h1:'Our Services',
    svc_ph_p:'An integrated offer of advisory, financial engineering and technical expertise to fulfil your ambitions.',
    svc_bc:'Our Services',
    svc_s01:'Service 01', svc_s02:'Service 02', svc_s03:'Service 03', svc_s04:'Service 04',
    svc_s05:'Service 05', svc_s06:'Service 06', svc_s07:'Service 07', svc_s08:'Service 08',
    svc_h01:'Project writing', svc_h02:'Resource mobilization',
    svc_h03:'Professional training', svc_h04:'Financial & organisational structuring',
    svc_h05:'Real estate expertise', svc_h06:'Industrial expertise',
    svc_h07:'Insurance expertise', svc_h08:'Legal & financial engineering',
    svc_d01:'We develop solid, compelling strategic documents to maximise your chances of securing financing or a partnership.',
    svc_d02:'We identify and structure the best financing sources for your projects, leveraging our network across Africa and internationally.',
    svc_d03:'Tailored training programmes to strengthen your teams\' skills in finance, project management and risk management.',
    svc_d04:'We optimise the financial and organisational structure of your projects and companies to maximise performance and attract investors.',
    svc_d05:'Our certified real estate experts evaluate, audit and analyse your property assets to give you an accurate picture of their value.',
    svc_d06:'We conduct technical audits and evaluations of industrial units to give you a clear view of the value and risks of your assets.',
    svc_d07:'We support businesses and institutions in analysing their insurable risks and implementing optimal coverage.',
    svc_d08:'Strategic combination of law, finance and contractual structuring to secure your operations.',
    svc_vis01:'A compelling file', svc_vis01p:'Our experts draft files to international standards, tailored to the requirements of donors, banks and institutional investors.',
    svc_vis02:'Tailored financing', svc_vis02p:'Access our network of institutional investors, investment funds and partner banks across Africa and Europe.',
    svc_vis03:'Upskill your teams', svc_vis03p:'Our expert trainers deliver programmes adapted to African market realities and international standards.',
    svc_vis04:'Financial optimisation', svc_vis04p:'Dynamic business plans, cash flow projections, IRR and NPV to decide with full clarity.',
    svc_vis05:'Certified valuation', svc_vis05p:'Appraisals recognised by banks, insurance companies and local jurisdictions.',
    svc_vis06:'Industrial technical audit', svc_vis06p:'Rigorous assessments to secure your investments in industrial assets.',
    svc_vis07:'Protect your assets', svc_vis07p:'Coverage strategies tailored to each type of project and company structure.',
    svc_vis08:'Total legal security', svc_vis08p:'From initial structuring to final signature: every legal and contractual aspect is secured.',
    svc_cta_h2:'Ready to structure your project?',
    svc_cta_p:'Our experts analyse your file for free during a first confidential interview.',
    svc_extra_label:'Additional offers', svc_extra_h2:'Additional services',
    svc_extra_p:'Discover our complementary service offers published by our team.',
    /* ── BLOG ── */
    blog_ph_h1:'News & Blog',
    blog_ph_p:'Financial analyses, investment opportunities, economic notes and firm news.',
    blog_bc:'News & Blog',
    blog_feat_tag:'Featured',
    blog_feat_h3:'2026 Guide: Financing your project in West Africa',
    blog_feat_p:'Our comprehensive guide to financing instruments available for businesses and developers.',
    blog_feat_btn:'View our brochures →',
    blog_cat:'Categories', blog_nl_title:'Newsletter',
    blog_nl_p:'Receive our analyses directly in your inbox.',
    blog_nl_btn:'Subscribe', blog_follow:'Follow us',
    blog_cta_h:'Need expertise?',
    blog_cta_p:'First interview free and confidential with one of our experts.',
    blog_cta_btn:'Book an appointment',
    blog_consult:'Consult an expert',
    /* ── RÉALISATIONS ── */
    real_ph_h1:'Our Projects',
    real_ph_p:'A portfolio of concrete projects illustrating our expertise and commitment to Africa\'s development.',
    real_bc:'Projects',
    real_f_all:'All', real_f_energy:'Energy', real_f_immo:'Real estate',
    real_f_agro:'Agro-industry', real_f_finance:'Finance', real_f_infra:'Infrastructure',
    real_portfolio_label:'Project portfolio', real_portfolio_h2:'Case studies',
    real_stat1:'Projects completed', real_stat2:'Countries covered',
    real_stat3:'Financing raised', real_stat4:'Sectors covered',
    real_temoign_label:'What our clients say', real_temoign_h2:'Testimonials',
    real_cta_h2:'Your project will be our next success',
    real_cta_p:'Contact us to discuss your project and get a free preliminary analysis.',
    /* ── PARTENAIRES ── */
    part_ph_h1:'Strategic Partnerships',
    part_ph_p:'Let us build lasting alliances to multiply the impact of your projects across Africa and internationally.',
    part_bc:'Our Partners',
    part_intro_label:'Our partnership approach',
    part_intro_h2:'Strategic alliances in the service of development',
    part_intro_p1:'AMEXPERTS & PARTNERS firmly believes that strategic cooperation is the most powerful lever to accelerate Africa\'s economic development.',
    part_intro_p2:'Whether you are a financial institution, expert firm, investment fund or NGO, we are open to exploring forms of collaboration tailored to your objectives.',
    part_intro_btn:'Propose a partnership',
    part_types_label:'Forms of collaboration', part_types_h2:'Types of partnerships offered',
    part_t1:'Joint Venture', part_t1p:'Creation of joint entities to structure and deliver large-scale projects requiring complementary multidisciplinary skills.',
    part_t2:'Public-Private Partnership (PPP)', part_t2p:'Structuring and supporting PPPs for infrastructure development, delegated public services and collective facilities.',
    part_t3:'Memorandum of Understanding', part_t3p:'Formalisation of cooperation agreements, skills exchanges and mutual referrals with strategic partners.',
    part_t4:'Technical agreements', part_t4p:'Collaboration on complementary technical expertise: engineering, audit, legal advice, sector expertise.',
    part_t5:'Financial agreements', part_t5p:'Co-financing structuring, risk sharing and pooling of financial mobilisation capacity.',
    part_t6:'Expert networks', part_t6p:'Integration into our network of referenced experts to intervene in support of one-off or recurring assignments.',
    part_eco_label:'Our ecosystem', part_eco_h2:'Partners & Collaborators',
    part_eco_p:'We collaborate with a selected network of institutions and experts sharing our values of excellence and integrity.',
    part_join_label:'Join us', part_join_h2:'Propose a partnership',
    part_p1:'Banking Institutions', part_p2:'Investment Funds',
    part_p3:'Law Firms', part_p4:'Engineering Offices',
    part_p5:'NGOs & Cooperation', part_p6:'Insurance Companies',
    part_join_p:'Would you like to collaborate with AMEXPERTS & PARTNERS? Describe your organisation and your value proposition.',
    /* ── PROJETS ── */
    proj_ph_h1:'Projects Seeking Financing',
    proj_ph_p:'A portfolio of selected, structured projects accompanied by our firm, open to investment.',
    proj_bc:'Projects for funding',
    proj_disclaimer:'The projects presented are supported by AMEXPERTS & PARTNERS in their structuring and financing process. Any expression of interest will be treated confidentially.',
    proj_submit_label:'Have a project?', proj_submit_h2:'Submit a project for financing',
    proj_submit_p:'Are you a project developer seeking financing? Submit it to our team for a free preliminary analysis.',
    proj_btn_interest:'Express my interest', proj_btn_discuss:'Discuss with an expert',
    proj_submit_btn:'Submit my project',
    /* ── BROCHURE ── */
    broch_ph_h1:'Corporate Brochure',
    broch_ph_p:'Download our official documentation to learn more about our firm and services.',
    broch_bc:'Corporate Brochure',
    broch_dl_label:'Downloads', broch_dl_h2:'Our official documentation',
    broch_dl_p:'Find all our institutional documentation to learn about our expertise, references and service offerings.',
    broch_info:'Documents are sent by email on request. Click "Request" to send a query to our team.',
    broch_contact_label:'Direct contact', broch_contact_h2:'Need more information?',
    broch_contact_p:'Our team is available to answer all your questions and provide the documents you need.',
    broch_email:'Send an email', broch_rdv:'Book an appointment',
  }
};

function applyLang(l) {
  if (!D[l]) return;
  window._ampLang = l;
  try { localStorage.setItem('amp_lang', l); } catch(e){}
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var k = el.getAttribute('data-i18n');
    var v = D[l][k];
    if (v === undefined) return;
    if (v.indexOf('<') !== -1) el.innerHTML = v;
    else el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    var v = D[l][el.getAttribute('data-i18n-ph')];
    if (v) el.placeholder = v;
  });
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === l);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var saved = 'fr';
  try { saved = localStorage.getItem('amp_lang') || 'fr'; } catch(e){}
  var tog = document.getElementById('navToggle');
  var lnk = document.getElementById('navLinks');
  if (tog && lnk) {
    tog.addEventListener('click', function() { lnk.classList.toggle('open'); });
    lnk.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { lnk.classList.remove('open'); });
    });
  }
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.addEventListener('click', function() { applyLang(this.dataset.lang); });
  });
  applyLang(saved);
});

window.applyLang = applyLang;
window.AMP_DICT  = D;
})();
