// ===== Shared site script =====
(function(){
  const d = document;

  // ===== i18n dictionary =====
  const I18N = {
    en: {
      // nav / footer / palette
      'nav.home': 'Home',
      'nav.experience': 'Experience',
      'nav.resume': 'Resume',
      'nav.contact': 'Contact',
      'footer.tag': 'Built for game day.',
      'footer.kbd': 'Try <kbd>⌘</kbd> <kbd>K</kbd> anywhere on the site.',
      'palette.placeholder': 'Jump to… (home, experience, contact, rink, arcade, email, linkedin)',
      'palette.placeholderShort': 'Jump to…',
      // page titles / meta descriptions
      'meta.home.title': 'Dominic Andrade — Sport & Event Management',
      'meta.home.desc': 'Dominic Andrade — senior at Niagara University studying Sport Management & Tourism Event Management. Rochester Red Wings ballpark operations intern.',
      'meta.experience.title': 'Experience — Dominic Andrade',
      'meta.experience.desc': 'Experience, education, skills, and certifications for Dominic Andrade.',
      'meta.resume.title': 'Resume — Dominic Andrade',
      'meta.resume.desc': 'Résumé for Dominic Andrade — Sport Management & Tourism Event Management senior at Niagara University.',
      'meta.contact.title': 'Contact — Dominic Andrade',
      'meta.contact.desc': 'Get in touch with Dominic Andrade — email and LinkedIn.',
      'meta.404.title': 'Offside — Dominic Andrade',
      // home
      'home.eyebrow': 'Penfield, NY · Class of 2026',
      'home.hi': "Hi, I'm ",
      'home.build': 'I build ',
      'home.gde': 'game-day experiences',
      'home.sub': 'Senior at Niagara University studying Sport Management and Tourism Event Management. Ballpark operations intern with the Rochester Red Wings, grounds crew at Midvale Country Club.',
      'home.cta.exp': 'See my experience →',
      'home.cta.resume': 'View résumé',
      'home.cta.contact': 'Get in touch',
      'home.stat.grounds': 'yrs · Grounds Crew',
      'home.stat.games': '+ Red Wings home games',
      'home.stat.fans': '+ fans hosted per night',
      'home.stat.grad': 'B.S. graduation',
      'home.about.title': "What I'm about",
      'home.card1.h': 'Stadium & Event Ops',
      'home.card1.p': 'From Red Wings home stands to weddings, concerts, and festivals at Innovative Field — I love the choreography behind a clean, on-time event.',
      'home.card2.h': 'Hockey in my blood',
      'home.card2.p': "Niagara University Club Hockey. LA Kings fan. If it's on ice, I'm watching, playing, or talking about it.",
      'home.card3.h': 'Hospitality, end-to-end',
      'home.card3.p': "Three seasons on a grounds crew, ServSafe certified, and Eta Sigma Delta honor society — hospitality isn't a side quest, it's the main thing.",
      'home.hl.title': 'A quick highlight',
      'home.hl.body': '"Tourism students from Niagara University joined inbound operators at <strong>IITA Summit 2026</strong> to experience the sector firsthand — a valuable behind-the-scenes look at how inbound business is built."',
      'home.hl.cite': '— International Inbound Travel Association',
      'home.photo.cap': 'Off the clock — still chasing the lights.',
      // experience
      'exp.title': 'Experience',
      'exp.lead': 'Three seasons on a grounds crew, a Red Wings internship running point on 80+ event nights, and an honors-society seat in Eta Sigma Delta.',
      'exp.filter.all': 'All',
      'exp.filter.sports': 'Sports',
      'exp.filter.hospitality': 'Hospitality',
      'exp.filter.ops': 'Operations',
      'exp.rw.role': 'Ballpark Operations Intern',
      'exp.rw.org': 'Rochester Red Wings · Innovative Field',
      'exp.rw.date': 'Mar 2025 – Aug 2025',
      'exp.rw.body': 'Hands-on role inside a multi-use stadium — not just Red Wings home games, but weddings, fundraisers, festivals, and concerts. Responsible for event prep, facility turnover, and keeping the ballpark up to standard for every audience that walked through the gates.',
      'exp.mv.role': 'Grounds Crew',
      'exp.mv.org': 'Midvale Country Club · Seasonal',
      'exp.mv.date': 'Apr 2023 – Present · 3 yrs',
      'exp.mv.body': "Dawn-patrol crew keeping a private club's grounds tournament-ready through three seasons. Early hours, detail work, and the kind of consistency members notice before they can name why.",
      'exp.ev.role': 'Maintenance',
      'exp.ev.org': 'Eastview Mall · Part-time',
      'exp.ev.date': 'Dec 2024 – Jan 2025',
      'exp.ev.body': "Holiday-season maintenance at one of upstate New York's busiest retail destinations.",
      'exp.el.role': 'Evening Dining Staff',
      'exp.el.org': 'Elderwood Assisted Living at Penfield',
      'exp.el.date': 'Jun 2022 – Jun 2023',
      'exp.el.body': 'Dining service for residents — the job that taught me hospitality is equal parts logistics and empathy.',
      'tag.eventmgmt': 'Event Management',
      'tag.problem': 'Problem Solving',
      'tag.cs': 'Customer Service',
      'tag.time': 'Time Management',
      'tag.comm': 'Communication',
      'tag.detail': 'Attention to Detail',
      'tag.reliable': 'Reliability',
      'tag.seasonal': 'Seasonal Operations',
      'tag.food': 'Food Safety',
      'tag.hosp': 'Hospitality',
      'exp.edu.title': 'Education',
      'exp.edu.nu.deg': 'B.S. Sport Management & Tourism Event Management · 2022 – 2026',
      'exp.edu.nu.club': 'Club Hockey',
      'exp.edu.nu.esd': '<strong>Eta Sigma Delta</strong> — International Honor Society for Hospitality & Tourism',
      'exp.edu.ps': 'Penfield Senior High School',
      'exp.edu.ps.deg': 'Academic · 2018 – 2022 · Varsity',
      'exp.cert.title': 'Certifications',
      'exp.cert.servsafe': '<strong>ServSafe Food Handler</strong> <span>Mar 2024 – Mar 2027</span>',
      'exp.cert.hsocial': '<strong>HubSpot — Social Media Marketing</strong> <span>Apr 2023</span>',
      'exp.cert.hcontent': '<strong>HubSpot — Content Marketing</strong> <span>Apr 2023</span>',
      'exp.cert.word': '<strong>Microsoft Office Specialist: Word</strong> <span>Nov 2021</span>',
      'exp.cert.ppt': '<strong>Microsoft Office Specialist: PowerPoint</strong> <span>Jan 2022</span>',
      'exp.skills.title': 'Skills',
      'exp.skill.msoffice': 'Microsoft Office',
      'exp.skill.foodmgmt': 'Food Safety Mgmt',
      'exp.skill.social': 'Social / Content Marketing',
      // resume
      'res.title': 'Resume',
      'res.lead': 'The official version — mirrors my printed résumé. Prefer the PDF? Grab it below.',
      'res.download': '⬇ Download PDF',
      'res.print': '🖨 Print',
      'res.edu': 'Education',
      'res.edu.deg': 'Bachelor of Science in Sports Management and Tourism Event Management',
      'res.edu.gpa': 'GPA: 3.51',
      'res.edu.esd': '<strong>Eta Sigma Delta</strong> — International Honor Society for Hospitality and Tourism Students',
      'res.courses': 'Related Courses',
      'res.course1': '<strong>Sports Management and Recreation</strong> — Study of issues concerning organizing and managing sport-related business.',
      'res.course2': '<strong>Sport Communication and Technology</strong> — The relation between the informational and commercial sides of sport information management and technology.',
      'res.course3': '<strong>Management and Leadership</strong> — Core information on management and leadership techniques in hospitality, tourism, and sport management industries.',
      'res.exp': 'Related Experience',
      'res.rw.role': 'Ball Park Operations Intern',
      'res.rw.b1': 'Assisted the Director of Ballpark Operations and General Manager in maintaining the pristine condition of Innovative Field.',
      'res.rw.b2': 'Developed skills in performing minor repair tasks, such as fixing stadium seats or railings, to ensure the safety and comfort of the patrons.',
      'res.rw.b3': 'Gained hands-on experience in operational tasks throughout the stadium in preparation for Rochester Red Wings home games and non-baseball-related events.',
      'res.rw.b4': 'Learned the reasons behind setting up security walk-throughs, bike racks, fencing, furniture, and placing stanchions.',
      'res.mv.role': 'Grounds Crew Team Member',
      'res.mv.b1': 'Safely operate and maintain groundskeeping equipment such as mowers, blowers, and trimmers.',
      'res.mv.b2': 'Assist in preparing the course for daily play, including raking bunkers and setting up tee boxes.',
      'res.mv.b3': 'Work closely and communicate with other grounds crew members and management to achieve course maintenance goals and enhance the course experience.',
      'res.mv.b4': 'Perform seasonal duties such as seeding, sodding, and aeration.',
      'res.iv.role': 'Pro Shop Attendant',
      'res.iv.b1': 'Provided general receptionist and various administrative duties.',
      'res.iv.b2': 'Opened and closed the facility by following proper procedures.',
      'res.iv.b3': 'Followed all established safety procedures, including reporting incidents/accidents, equipment malfunctions, and unsafe or hazardous conditions.',
      'res.tech': 'Technical Skills',
      'res.tech.word': 'Microsoft Word — Certified',
      'res.tech.ppt': 'Microsoft PowerPoint — Certified',
      'res.act': 'Activities',
      'res.act.club': 'Member — Niagara University Club Hockey',
      // contact
      'ct.title': "Let's talk.",
      'ct.lead': "Recruiting for a sports / hospitality / event role? I'd love to hear about it. Quickest ways to reach me are below — and yes, those email &amp; LinkedIn cards are interactive.",
      'ct.email.h': 'Email',
      'ct.email.p': 'Best for recruiting &amp; intro chats.',
      'ct.email.back': 'Click to open your mail client →',
      'ct.li.h': 'LinkedIn',
      'ct.li.p': 'Full profile, recommendations, and reposts.',
      'ct.li.back': 'Open in a new tab →',
      'ct.loc.h': 'Based in',
      'ct.loc.p': 'Penfield, New York<br/><small>Open to relocation for the right role</small>',
      'ct.status.h': 'Status',
      'ct.status.p': 'Senior at Niagara University · Graduating 2026<br/><small>Open to full-time &amp; summer opportunities</small>',
      'ct.form.h': 'Or drop a note',
      'ct.form.muted': 'This form opens your default email client pre-filled — no backend, no tracking.',
      'ct.form.name': 'Your name',
      'ct.form.email': 'Your email',
      'ct.form.subject': 'Subject',
      'ct.form.subjectVal': 'Opportunity for Dominic',
      'ct.form.message': 'Message',
      'ct.form.send': 'Send via email →',
      // 404
      'err.h': 'Offside.',
      'err.p': "That page doesn't exist — let's get you back in the play.",
      'err.back': '← Back home',
      // typed words (JSON array string)
      'home.typed': '["Dominic","Dom","Dominic Andrade"]',
      // palette items
      'pal.home': 'Home',
      'pal.experience': 'Experience',
      'pal.resume': 'Resume',
      'pal.resumePdf': 'Download resume PDF',
      'pal.contact': 'Contact',
      'pal.email': 'Email Dominic',
      'pal.linkedin': 'LinkedIn',
      'pal.theme': 'Toggle theme',
      'pal.themeSub': 'light / dark',
      'pal.lang': 'Toggle language',
      'pal.langSub': 'English / Français',
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.experience': 'Expérience',
      'nav.resume': 'CV',
      'nav.contact': 'Contact',
      'footer.tag': 'Conçu pour le jour du match.',
      'footer.kbd': 'Essayez <kbd>⌘</kbd> <kbd>K</kbd> partout sur le site.',
      'palette.placeholder': 'Aller à… (accueil, expérience, contact, email, linkedin)',
      'palette.placeholderShort': 'Aller à…',
      'meta.home.title': 'Dominic Andrade — Gestion du sport et des événements',
      'meta.home.desc': 'Dominic Andrade — étudiant en dernière année à l\'Université Niagara en Gestion du sport et Gestion touristique des événements. Stagiaire en opérations de stade avec les Rochester Red Wings.',
      'meta.experience.title': 'Expérience — Dominic Andrade',
      'meta.experience.desc': 'Expérience, formation, compétences et certifications de Dominic Andrade.',
      'meta.resume.title': 'CV — Dominic Andrade',
      'meta.resume.desc': 'CV de Dominic Andrade — étudiant en dernière année à l\'Université Niagara en Gestion du sport et Gestion touristique des événements.',
      'meta.contact.title': 'Contact — Dominic Andrade',
      'meta.contact.desc': 'Contactez Dominic Andrade — courriel et LinkedIn.',
      'meta.404.title': 'Hors-jeu — Dominic Andrade',
      'home.eyebrow': 'Penfield, NY · Promotion 2026',
      'home.hi': 'Bonjour, je suis ',
      'home.build': 'Je crée des ',
      'home.gde': 'expériences de jour de match',
      'home.sub': "Étudiant en dernière année à l'Université Niagara en Gestion du sport et Gestion touristique des événements. Stagiaire en opérations de stade avec les Rochester Red Wings, équipe d'entretien au Midvale Country Club.",
      'home.cta.exp': 'Voir mon expérience →',
      'home.cta.resume': 'Voir le CV',
      'home.cta.contact': 'Me contacter',
      'home.stat.grounds': 'ans · équipe d\'entretien',
      'home.stat.games': '+ matchs à domicile des Red Wings',
      'home.stat.fans': '+ spectateurs accueillis par soirée',
      'home.stat.grad': 'obtention du B.Sc.',
      'home.about.title': 'Ce qui me définit',
      'home.card1.h': 'Opérations de stade et d\'événements',
      'home.card1.p': "Des gradins des Red Wings aux mariages, concerts et festivals à Innovative Field — j'adore la chorégraphie derrière un événement propre et ponctuel.",
      'home.card2.h': 'Le hockey dans le sang',
      'home.card2.p': "Club de hockey de l'Université Niagara. Partisan des LA Kings. Si c'est sur la glace, je le regarde, j'y joue ou j'en parle.",
      'home.card3.h': 'Hospitalité, du début à la fin',
      'home.card3.p': "Trois saisons dans une équipe d'entretien de terrain, certifié ServSafe, et membre de la société d'honneur Eta Sigma Delta — l'hospitalité n'est pas un à-côté, c'est l'essentiel.",
      'home.hl.title': 'Un coup de projecteur',
      'home.hl.body': "« Les étudiants en tourisme de l'Université Niagara ont rejoint les opérateurs réceptifs au <strong>Sommet IITA 2026</strong> pour découvrir le secteur de première main — un aperçu précieux des coulisses du tourisme réceptif. »",
      'home.hl.cite': '— International Inbound Travel Association',
      'home.photo.cap': 'Hors du travail — toujours à la poursuite des lumières.',
      'exp.title': 'Expérience',
      'exp.lead': "Trois saisons dans une équipe d'entretien de terrain, un stage chez les Red Wings à piloter plus de 80 soirées d'événement, et un siège à la société d'honneur Eta Sigma Delta.",
      'exp.filter.all': 'Tous',
      'exp.filter.sports': 'Sports',
      'exp.filter.hospitality': 'Hospitalité',
      'exp.filter.ops': 'Opérations',
      'exp.rw.role': 'Stagiaire en opérations de stade',
      'exp.rw.org': 'Rochester Red Wings · Innovative Field',
      'exp.rw.date': 'Mars 2025 – Août 2025',
      'exp.rw.body': "Rôle pratique dans un stade polyvalent — pas seulement les matchs à domicile des Red Wings, mais aussi mariages, collectes de fonds, festivals et concerts. Responsable de la préparation des événements, du réaménagement des installations et du maintien du stade aux normes pour chaque public.",
      'exp.mv.role': 'Équipe d\'entretien de terrain',
      'exp.mv.org': 'Midvale Country Club · Saisonnier',
      'exp.mv.date': 'Avr. 2023 – Présent · 3 ans',
      'exp.mv.body': "Équipe de l'aube préparant le terrain d'un club privé pour le tournoi à travers trois saisons. Heures matinales, travail de précision, et le genre de régularité que les membres remarquent avant de pouvoir la nommer.",
      'exp.ev.role': 'Entretien',
      'exp.ev.org': 'Eastview Mall · Temps partiel',
      'exp.ev.date': 'Déc. 2024 – Janv. 2025',
      'exp.ev.body': "Entretien de saison des fêtes dans l'une des destinations commerciales les plus fréquentées du nord de l'État de New York.",
      'exp.el.role': 'Personnel du service du soir',
      'exp.el.org': 'Elderwood Assisted Living à Penfield',
      'exp.el.date': 'Juin 2022 – Juin 2023',
      'exp.el.body': "Service des repas aux résidents — le travail qui m'a appris que l'hospitalité est à parts égales logistique et empathie.",
      'tag.eventmgmt': 'Gestion d\'événements',
      'tag.problem': 'Résolution de problèmes',
      'tag.cs': 'Service à la clientèle',
      'tag.time': 'Gestion du temps',
      'tag.comm': 'Communication',
      'tag.detail': 'Souci du détail',
      'tag.reliable': 'Fiabilité',
      'tag.seasonal': 'Opérations saisonnières',
      'tag.food': 'Sécurité alimentaire',
      'tag.hosp': 'Hospitalité',
      'exp.edu.title': 'Formation',
      'exp.edu.nu.deg': 'B.Sc. Gestion du sport et Gestion touristique des événements · 2022 – 2026',
      'exp.edu.nu.club': 'Club de hockey',
      'exp.edu.nu.esd': "<strong>Eta Sigma Delta</strong> — Société internationale d'honneur pour l'hospitalité et le tourisme",
      'exp.edu.ps': 'Penfield Senior High School',
      'exp.edu.ps.deg': 'Académique · 2018 – 2022 · Équipe universitaire',
      'exp.cert.title': 'Certifications',
      'exp.cert.servsafe': '<strong>ServSafe Food Handler</strong> <span>Mars 2024 – Mars 2027</span>',
      'exp.cert.hsocial': '<strong>HubSpot — Marketing des médias sociaux</strong> <span>Avr. 2023</span>',
      'exp.cert.hcontent': '<strong>HubSpot — Marketing de contenu</strong> <span>Avr. 2023</span>',
      'exp.cert.word': '<strong>Microsoft Office Specialist : Word</strong> <span>Nov. 2021</span>',
      'exp.cert.ppt': '<strong>Microsoft Office Specialist : PowerPoint</strong> <span>Janv. 2022</span>',
      'exp.skills.title': 'Compétences',
      'exp.skill.msoffice': 'Microsoft Office',
      'exp.skill.foodmgmt': 'Gestion sécurité alimentaire',
      'exp.skill.social': 'Marketing social / contenu',
      'res.title': 'CV',
      'res.lead': 'La version officielle — reflète mon CV imprimé. Vous préférez le PDF ? Téléchargez-le ci-dessous.',
      'res.download': '⬇ Télécharger le PDF',
      'res.print': '🖨 Imprimer',
      'res.edu': 'Formation',
      'res.edu.deg': 'Baccalauréat en sciences en Gestion du sport et Gestion touristique des événements',
      'res.edu.gpa': 'Moyenne : 3,51',
      'res.edu.esd': "<strong>Eta Sigma Delta</strong> — Société internationale d'honneur pour les étudiants en hospitalité et tourisme",
      'res.courses': 'Cours pertinents',
      'res.course1': "<strong>Gestion du sport et loisirs</strong> — Étude des enjeux liés à l'organisation et à la gestion d'entreprises du domaine sportif.",
      'res.course2': "<strong>Communication et technologie sportives</strong> — La relation entre les côtés informationnel et commercial de la gestion de l'information sportive et de la technologie.",
      'res.course3': "<strong>Management et leadership</strong> — Informations fondamentales sur les techniques de management et de leadership dans les industries de l'hospitalité, du tourisme et de la gestion du sport.",
      'res.exp': 'Expérience pertinente',
      'res.rw.role': 'Stagiaire en opérations de stade',
      'res.rw.b1': "Assisté le directeur des opérations du stade et le directeur général pour maintenir les conditions impeccables d'Innovative Field.",
      'res.rw.b2': "Développé des compétences dans l'exécution de tâches de réparation mineures, telles que la réparation de sièges ou de rampes du stade, pour assurer la sécurité et le confort des spectateurs.",
      'res.rw.b3': "Acquis une expérience pratique des tâches opérationnelles dans tout le stade pour préparer les matchs à domicile des Rochester Red Wings et des événements non liés au baseball.",
      'res.rw.b4': "Appris les raisons derrière la mise en place des contrôles de sécurité, des supports à vélos, des clôtures, du mobilier et des poteaux de balisage.",
      'res.mv.role': 'Membre de l\'équipe d\'entretien',
      'res.mv.b1': "Utiliser et entretenir en toute sécurité l'équipement d'entretien tel que tondeuses, souffleurs et taille-bordures.",
      'res.mv.b2': "Aider à la préparation du parcours pour le jeu quotidien, y compris ratisser les fosses de sable et installer les tertres de départ.",
      'res.mv.b3': "Travailler et communiquer étroitement avec les autres membres de l'équipe d'entretien et la direction pour atteindre les objectifs d'entretien et améliorer l'expérience sur le parcours.",
      'res.mv.b4': 'Effectuer des tâches saisonnières telles que le semis, le gazonnement et l\'aération.',
      'res.iv.role': 'Préposé au pro-shop',
      'res.iv.b1': 'Assuré des tâches de réception générale et diverses tâches administratives.',
      'res.iv.b2': "Ouvert et fermé l'établissement en suivant les procédures appropriées.",
      'res.iv.b3': "Respecté toutes les procédures de sécurité établies, y compris la déclaration des incidents/accidents, des dysfonctionnements d'équipement et des conditions dangereuses.",
      'res.tech': 'Compétences techniques',
      'res.tech.word': 'Microsoft Word — Certifié',
      'res.tech.ppt': 'Microsoft PowerPoint — Certifié',
      'res.act': 'Activités',
      'res.act.club': 'Membre — Club de hockey de l\'Université Niagara',
      'ct.title': 'Discutons.',
      'ct.lead': "Vous recrutez pour un poste en sport / hospitalité / événementiel ? J'adorerais en savoir plus. Les meilleurs moyens de me joindre sont ci-dessous — et oui, les cartes courriel &amp; LinkedIn sont interactives.",
      'ct.email.h': 'Courriel',
      'ct.email.p': 'Idéal pour le recrutement &amp; les premiers contacts.',
      'ct.email.back': 'Cliquez pour ouvrir votre client courriel →',
      'ct.li.h': 'LinkedIn',
      'ct.li.p': 'Profil complet, recommandations et republications.',
      'ct.li.back': 'Ouvrir dans un nouvel onglet →',
      'ct.loc.h': 'Basé à',
      'ct.loc.p': 'Penfield, New York<br/><small>Ouvert à la relocalisation pour le bon poste</small>',
      'ct.status.h': 'Statut',
      'ct.status.p': "Dernière année à l'Université Niagara · Diplôme 2026<br/><small>Ouvert aux postes à temps plein &amp; aux stages d'été</small>",
      'ct.form.h': 'Ou écrivez-moi',
      'ct.form.muted': 'Ce formulaire ouvre votre client courriel par défaut pré-rempli — aucun backend, aucun suivi.',
      'ct.form.name': 'Votre nom',
      'ct.form.email': 'Votre courriel',
      'ct.form.subject': 'Objet',
      'ct.form.subjectVal': 'Opportunité pour Dominic',
      'ct.form.message': 'Message',
      'ct.form.send': 'Envoyer par courriel →',
      'err.h': 'Hors-jeu.',
      'err.p': "Cette page n'existe pas — revenons dans le match.",
      'err.back': '← Retour à l\'accueil',
      'home.typed': '["Dominic","Dom","Dominic Andrade"]',
      'pal.home': 'Accueil',
      'pal.experience': 'Expérience',
      'pal.resume': 'CV',
      'pal.resumePdf': 'Télécharger le CV (PDF)',
      'pal.contact': 'Contact',
      'pal.email': 'Écrire à Dominic',
      'pal.linkedin': 'LinkedIn',
      'pal.theme': 'Changer le thème',
      'pal.themeSub': 'clair / sombre',
      'pal.lang': 'Changer de langue',
      'pal.langSub': 'English / Français',
    }
  };

  let currentLang = localStorage.getItem('lang') === 'fr' ? 'fr' : 'en';

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en[key]) || '';
  }

  function applyLang(lang) {
    currentLang = (lang === 'fr') ? 'fr' : 'en';
    localStorage.setItem('lang', currentLang);
    d.documentElement.lang = currentLang;

    d.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = t(key);
      if (val === '') return;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });

    d.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!attr || !key) return;
        const val = t(key);
        if (val !== '') el.setAttribute(attr, val);
      });
    });

    const page = d.body && d.body.dataset.page;
    if (page) {
      const title = t('meta.' + page + '.title');
      if (title) d.title = title;
      const desc = t('meta.' + page + '.desc');
      const m = d.querySelector('meta[name="description"]');
      if (desc && m) m.setAttribute('content', desc);
    }

    const lbl = d.querySelector('#lang-toggle .lang-label');
    if (lbl) lbl.textContent = currentLang === 'fr' ? 'FR' : 'EN';
  }

  // Year
  const y = d.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Theme
  const root = d.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  const toggle = d.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', cur);
      localStorage.setItem('theme', cur);
    });
  }

  // Language toggle
  const langBtn = d.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(currentLang === 'en' ? 'fr' : 'en');
      // Re-render palette if open, and rebuild its items so labels match
      buildPaletteItems();
    });
  }

  // Apply saved language on load
  applyLang(currentLang);

  // Cursor glow
  const glow = d.querySelector('.cursor-glow');
  if (glow && matchMedia('(hover:hover)').matches) {
    let tx = -9999, ty = -9999, cx = tx, cy = ty;
    window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function raf(){
      cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
      requestAnimationFrame(raf);
    })();
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  d.querySelectorAll('.reveal, .skills').forEach(el => io.observe(el));

  // Count-up stats
  const nums = d.querySelectorAll('.num[data-count]');
  const numIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1200;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const v = Math.floor(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = el.dataset.raw === 'true' || end < 10000 ? String(v) : v.toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      numIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => numIO.observe(n));

  // Typed name
  const typed = d.getElementById('typed-name');
  if (typed) {
    let words;
    try { words = JSON.parse(t('home.typed')); } catch(_) { words = ['Dominic','Dom','Dominic Andrade']; }
    let wi = 0, ci = 0, dir = 1, pause = 0;
    typed.textContent = '';
    const step = () => {
      if (pause > 0) { pause--; return setTimeout(step, 40); }
      const w = words[wi];
      ci += dir;
      typed.textContent = w.slice(0, ci);
      if (ci === w.length) { dir = -1; pause = 40; }
      else if (ci === 0 && dir === -1) { dir = 1; wi = (wi + 1) % words.length; pause = 10; }
      setTimeout(step, dir === 1 ? 90 : 45);
    };
    step();
  }

  // Experience filter
  d.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      d.querySelectorAll('.chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected','false'); });
      chip.classList.add('active'); chip.setAttribute('aria-selected','true');
      const f = chip.dataset.filter;
      d.querySelectorAll('.tl-item').forEach(it => {
        const tags = (it.dataset.tags || '').split(/\s+/);
        it.hidden = !(f === 'all' || tags.includes(f));
      });
    });
  });

  // Contact form -> mailto
  const form = d.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const body = `From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`;
      window.location.href = `mailto:domhg30@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
    });
  }

  // Command palette
  const palette = d.getElementById('palette');
  const pInput = d.getElementById('palette-input');
  const pList = d.getElementById('palette-list');
  let items = [];
  function buildPaletteItems() {
    items = [
      { label: t('pal.home'), sub: 'index.html', href: './index.html' },
      { label: t('pal.experience'), sub: 'experience.html', href: './experience.html' },
      { label: t('pal.resume'), sub: 'resume.html', href: './resume.html' },
      { label: t('pal.resumePdf'), sub: 'assets/Dominic-Andrade-Resume.pdf', href: 'assets/Dominic-Andrade-Resume.pdf' },
      { label: t('pal.contact'), sub: 'contact.html', href: './contact.html' },
      { label: t('pal.email'), sub: 'domhg30@gmail.com', href: 'mailto:domhg30@gmail.com' },
      { label: t('pal.linkedin'), sub: '/in/dominic-andrade', href: 'https://www.linkedin.com/in/dominic-andrade-235722251' },
      { label: t('pal.theme'), sub: t('pal.themeSub'), action: () => toggle && toggle.click() },
      { label: t('pal.lang'), sub: t('pal.langSub'), action: () => langBtn && langBtn.click() },
    ];
  }
  buildPaletteItems();
  let sel = 0;
  const render = (q = '') => {
    const ql = q.toLowerCase();
    const filtered = items.filter(i => i.label.toLowerCase().includes(ql) || (i.sub||'').toLowerCase().includes(ql));
    pList.innerHTML = filtered.map((i, idx) =>
      `<li data-idx="${idx}" class="${idx===sel?'sel':''}"><span>${i.label}</span><small>${i.sub||''}</small></li>`
    ).join('');
    pList._filtered = filtered;
  };
  const open = () => { if(!palette) return; palette.hidden = false; pInput.value=''; sel=0; render(); pInput.focus(); };
  const close = () => { if(palette) palette.hidden = true; };
  const run = (i) => {
    close();
    if (!i) return;
    if (i.action) i.action();
    else if (i.href) window.location.href = i.href;
  };

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); palette && palette.hidden ? open() : close(); }
    else if (e.key === 'Escape') close();
    else if (!palette || palette.hidden) return;
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min((pList._filtered||[]).length-1, sel+1); render(pInput.value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel-1); render(pInput.value); }
    else if (e.key === 'Enter') { e.preventDefault(); run((pList._filtered||[])[sel]); }
  });
  if (pInput) pInput.addEventListener('input', () => { sel = 0; render(pInput.value); });
  if (pList) pList.addEventListener('click', (e) => {
    const li = e.target.closest('li'); if (!li) return;
    run((pList._filtered||[])[parseInt(li.dataset.idx,10)]);
  });
  if (palette) palette.addEventListener('click', (e) => { if (e.target === palette) close(); });
})();
