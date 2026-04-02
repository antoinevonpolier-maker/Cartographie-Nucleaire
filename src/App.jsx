import { useState, useMemo } from "react";

const DATA = {
  gouvernance: {
    label: "Gouvernance & politique",
    icon: "🏛",
    color: "#534AB7",
    bg: "#EEEDFE",
    items: [
      { name: "Président de la République", desc: "Préside le Conseil de politique nucléaire (CPN). Fixe les grandes orientations : relance nucléaire (discours de Belfort, fév. 2022), prolongation du parc, export.", type: "Institution" },
      { name: "Conseil de politique nucléaire (CPN)", desc: "Créé par décret 2008-378. Définit les orientations en matière d'export, politique industrielle, énergétique, recherche, sûreté, sécurité et environnement.", type: "Instance" },
      { name: "CSFN", desc: "Comité stratégique de la filière nucléaire, sous l'égide du CNI. Réunit tous les acteurs. Contrat de filière 2025-2028 signé le 10 juin 2025. Présidé par Xavier Ursat.", type: "Instance" },
      { name: "DINN", desc: "Délégation interministérielle au nouveau nucléaire. Coordonne le programme EPR2 et les projets innovants au niveau interministériel.", type: "Administration" },
      { name: "DGEC", desc: "Direction générale de l'énergie et du climat (min. Transition écologique). Pilote la PPE, la SNBC et la politique énergétique nucléaire.", type: "Administration" },
      { name: "DGPR", desc: "Direction générale de la prévention des risques. Réglementation des risques technologiques liés au nucléaire.", type: "Administration" },
      { name: "DGE", desc: "Direction générale des entreprises (min. Économie). Politique industrielle nucléaire, compétences, innovation.", type: "Administration" },
      { name: "APE", desc: "Agence des participations de l'État. Actionnaire à 100% d'EDF depuis juin 2023 (renationalisation). Suivi des participations Orano, CEA.", type: "Administration" },
      { name: "Direction du Trésor", desc: "Ministère de l'Économie. Pilotage financier, schéma de financement EPR2, négociations européennes.", type: "Administration" },
      { name: "SGAE / CTE", desc: "Secrétariat général aux affaires européennes + Comité technique Euratom. Coordination des positions françaises à Bruxelles.", type: "Administration" },
      { name: "OPECST", desc: "Office parlementaire d'évaluation des choix scientifiques et technologiques. Contrôle parlementaire, rapport annuel sur la sûreté.", type: "Parlement" },
      { name: "SHFDS", desc: "Service du haut fonctionnaire de défense et de sécurité. Protection des installations nucléaires contre les menaces.", type: "Défense" },
    ]
  },
  regulation: {
    label: "Régulation & sûreté",
    icon: "⚖",
    color: "#993556",
    bg: "#FBEAF0",
    items: [
      { name: "ASNR", desc: "Autorité de sûreté nucléaire et de radioprotection. Fusion ASN + IRSN effective au 1er janvier 2025. Autorité administrative indépendante. Contrôle, expertise, inspection des 57 réacteurs + installations du cycle.", type: "Autorité indépendante" },
      { name: "CRE", desc: "Commission de régulation de l'énergie. Évalue le coût du parc (60,3 €/MWh estimé). Encadre le VNU (Versement Nucléaire Universel), successeur de l'ARENH depuis 2025.", type: "Régulateur" },
      { name: "CEFRI", desc: "Comité français de certification des entreprises pour la formation et le suivi du personnel travaillant sous rayonnements ionisants. 280 établissements certifiés en AURA.", type: "Certification" },
      { name: "Organismes de qualification", desc: "AFCEN (codes RCC), Bureau Veritas, APAVE, Qualianor, etc. Délivrent les qualifications nécessaires pour intervenir sur les INB.", type: "Qualification" },
      { name: "CLI / ANCCLI", desc: "Commissions locales d'information auprès de chaque INB. ANCCLI : association nationale. Interface entre exploitants et riverains.", type: "Société civile" },
      { name: "HCTISN", desc: "Haut Comité pour la transparence et l'information sur la sécurité nucléaire. Concertation, débat public, transparence.", type: "Transparence" },
    ]
  },
  exploitants: {
    label: "Grands industriels & exploitants",
    icon: "⚡",
    color: "#185FA5",
    bg: "#E6F1FB",
    items: [
      { name: "EDF", desc: "Exploitant des 57 réacteurs REP sur 18 centrales. 100% État depuis 2023. Production : 373 TWh (2025). CA nucléaire ~23,7 Md€ (2026 prévisionnel). Maître d'ouvrage EPR2 (6+8 réacteurs). Porteur du SMR NUWARD.", type: "Exploitant", chiffres: "57 réacteurs · 18 centrales · 373 TWh" },
      { name: "Framatome", desc: "Filiale d'EDF. N°1 mondial des composants nucléaires : cuves, générateurs de vapeur, mécanismes de grappes, instrumentation & contrôle. Fabricant de combustible (usines Romans, FBFC). Partenaire NUWARD.", type: "Équipementier", chiffres: "~18 000 salariés" },
      { name: "TechnicAtome", desc: "Conception et réalisation de réacteurs nucléaires compacts. Chaufferies des SNLE, SNA et du porte-avions Charles de Gaulle. Partenaire industriel du consortium NUWARD. Siège : Aix-en-Provence.", type: "Réacteurs compacts", chiffres: "~2 000 salariés" },
      { name: "Naval Group", desc: "Construction navale militaire. Intégration des chaufferies nucléaires dans les sous-marins et le porte-avions. Partenaire NUWARD pour l'industrialisation et la fabrication en série.", type: "Naval", chiffres: "~17 000 salariés" },
      { name: "Assystem", desc: "Groupe international d'ingénierie nucléaire. 45 ans d'expérience dans le secteur. Accompagnement des clients sur tout le cycle de vie des installations.", type: "Ingénierie", chiffres: "~10 200 collaborateurs" },
    ]
  },
  cycle: {
    label: "Cycle du combustible",
    icon: "♻",
    color: "#0F6E56",
    bg: "#E1F5EE",
    items: [
      { name: "Orano Mining", desc: "Extraction d'uranium : mines au Niger (SOMAÏR, COMINAK arrêtée), Canada (McClean Lake, Cigar Lake), Kazakhstan (JV Katco). Capacité ~10 000 tU/an.", type: "Amont — Mines" },
      { name: "Orano Chimie-Enrichissement", desc: "Conversion : usines de Malvési (UF4) et Pierrelatte (UF6). Enrichissement par centrifugation : usine Georges Besse II (Tricastin), capacité 7,5 M UTS/an.", type: "Amont — Conversion & enrichissement" },
      { name: "Framatome FBFC", desc: "Fabrication des assemblages de combustible UO2 pour les REP. Usines de Romans-sur-Isère et Dessel (Belgique). Combustibles ATF (Accident Tolerant Fuel) en développement.", type: "Amont — Fabrication" },
      { name: "Orano Recyclage — La Hague", desc: "Retraitement des combustibles usés. Usine de La Hague (Cotentin) : ~1 700 tML/an. Séparation uranium/plutonium/déchets. Vitrification des déchets de haute activité.", type: "Aval — Retraitement" },
      { name: "Orano — Melox", desc: "Fabrication du combustible MOX (Mixed OXide) à Marcoule. Mélange oxyde d'uranium appauvri + plutonium recyclé. Alimente 24 réacteurs 900 MWe d'EDF.", type: "Aval — MOX" },
      { name: "ANDRA", desc: "Agence nationale pour la gestion des déchets radioactifs. 3 centres de stockage en surface (Aube, Manche). Projet Cigéo : stockage géologique profond réversible à Bure (Meuse/Haute-Marne) pour déchets HA et MA-VL.", type: "Aval — Déchets" },
      { name: "Orano DS (Démantèlement & Services)", desc: "Démantèlement des installations en fin de vie. Assainissement, logistique des déchets. Interventions sur les sites de Marcoule, Pierrelatte, La Hague.", type: "Aval — Démantèlement" },
      { name: "Technocentre (projet)", desc: "Projet de centre de recyclage des métaux faiblement radioactifs sur le site de Fessenheim. Débat public fin 2025. Porté par EDF.", type: "Aval — Recyclage métaux" },
    ]
  },
  parc: {
    label: "Parc nucléaire — 18 centrales (57 réacteurs)",
    icon: "🏭",
    color: "#854F0B",
    bg: "#FAEEDA",
    items: [
      { name: "Palier CP0 — 900 MWe (4 réacteurs)", desc: "Bugey 2-5 (Ain, AURA). Plus anciens réacteurs en service (1978-1979). 23 TWh en 2025.", type: "900 MWe" },
      { name: "Palier CPY — 900 MWe (28 réacteurs)", desc: "Blayais (4, Gironde) · Chinon (4, Indre-et-Loire) · Cruas-Meysse (4, Ardèche) · Dampierre (4, Loiret) · Gravelines (6, Nord — plus grande d'Europe) · Saint-Laurent (2, Loir-et-Cher) · Tricastin (4, Drôme).", type: "900 MWe" },
      { name: "Palier P4 — 1 300 MWe (8 réacteurs)", desc: "Flamanville 1-2 (Manche) · Paluel 1-4 (Seine-Maritime) · Saint-Alban 1-2 (Isère). Mis en service 1984-1987.", type: "1 300 MWe" },
      { name: "Palier P'4 — 1 300 MWe (12 réacteurs)", desc: "Belleville 1-2 (Cher) · Cattenom 1-4 (Moselle) · Golfech 1-2 (Tarn-et-Garonne) · Nogent 1-2 (Aube) · Penly 1-2 (Seine-Maritime). Mis en service 1987-1994.", type: "1 300 MWe" },
      { name: "Palier N4 — 1 450 MWe (4 réacteurs)", desc: "Chooz B1-B2 (Ardennes) · Civaux 1-2 (Vienne). Dernières mises en service avant l'EPR (1996-2002).", type: "1 450 MWe" },
      { name: "EPR — 1 600 MWe (1 réacteur)", desc: "Flamanville 3 (Manche). Raccordé au réseau le 21 décembre 2024. Plus puissant réacteur du parc. Rendement 37%.", type: "1 600 MWe" },
      { name: "Sites en démantèlement", desc: "Chooz A · Brennilis · Bugey 1 · Chinon A1-A3 · Saint-Laurent A1-A2 · Creys-Malville (Superphénix) · Fessenheim 1-2 (arrêt 2020). 12 installations en cours.", type: "Démantèlement" },
    ]
  },
  recherche: {
    label: "Recherche & développement",
    icon: "🔬",
    color: "#BA7517",
    bg: "#FAEEDA",
    items: [
      { name: "CEA", desc: "Commissariat à l'énergie atomique et aux énergies alternatives. Recherche fondamentale & appliquée. Sites majeurs : Saclay (Essonne), Cadarache (Bouches-du-Rhône), Marcoule (Gard), Grenoble. Essaimage de startups (Hexana, Stellaria, Otrera, Blue Capsule). Appui technique France 2030 (27,8 M€).", type: "Organisme public" },
      { name: "INSTN", desc: "Institut national des sciences et techniques nucléaires. Rattaché au CEA. Enseignement supérieur spécialisé. Membre du réseau européen ENEN.", type: "Enseignement" },
      { name: "GANIL", desc: "Grand accélérateur national d'ions lourds (Caen). CEA + CNRS. Recherche en physique nucléaire fondamentale. Projet SPIRAL2.", type: "Recherche fondamentale" },
      { name: "Réacteurs de recherche", desc: "OSIRIS (arrêté), ORPHÉE (arrêté), Jules Horowitz (JHR, en construction à Cadarache — irradiation de combustibles et matériaux). RES (Cadarache).", type: "Infrastructure" },
      { name: "IRSN (intégré à l'ASNR)", desc: "Ex-Institut de radioprotection et de sûreté nucléaire. Expertise technique, recherche en sûreté, radioprotection, environnement. Depuis 2025 intégré dans l'ASNR.", type: "Expertise" },
    ]
  },
  btp: {
    label: "BTP, ingénierie & sous-traitance",
    icon: "🏗",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    items: [
      { name: "Vinci Construction", desc: "Génie civil des centrales. Partenaire historique du programme nucléaire. Mobilisé sur les chantiers EPR2.", type: "BTP" },
      { name: "Bouygues Construction", desc: "Génie civil nucléaire. Participant au chantier EPR Flamanville. Positionné sur les futurs EPR2.", type: "BTP" },
      { name: "Eiffage", desc: "Génie civil et métallique. Interventions sur le grand carénage et les nouveaux projets.", type: "BTP" },
      { name: "Altrad", desc: "Services industriels, échafaudages, maintenance, calorifugeage. Acteur majeur de la sous-traitance nucléaire.", type: "Services industriels" },
      { name: "Assystem", desc: "Ingénierie nucléaire depuis 45 ans. Études, conseil, maîtrise des investissements. 10 200 collaborateurs dans le monde.", type: "Ingénierie" },
      { name: "Alten", desc: "Ingénierie et conseil en technologie. Prestations d'études et de support pour les exploitants et équipementiers nucléaires.", type: "Ingénierie" },
      { name: "Tractebel (Engie)", desc: "Ingénierie intégrée. Partenaire du consortium NUWARD depuis 2023. Expertise en conception de centrales.", type: "Ingénierie" },
      { name: "Onet Technologies", desc: "Maintenance, démantèlement, robotique d'intervention, logistique nucléaire. Partenaire de Jimmy Energy pour la fabrication de cuves.", type: "Services" },
      { name: "Nuvia (Vinci)", desc: "Ingénierie en radioprotection, assainissement, démantèlement, gestion des déchets.", type: "Spécialiste" },
      { name: "Groupe M / CSTI", desc: "PME/ETI spécialisées représentatives du tissu industriel. Mécanique, chaudronnerie, contrôle non destructif.", type: "PME spécialisées" },
      { name: "Tissu PME/ETI", desc: "3 200 entreprises dont 63,8% PME et 22% TPE. 73% des emplois de la filière sont chez les sous-traitants. 84 métiers cœurs identifiés par le GIFEN (programme MATCH).", type: "Écosystème", chiffres: "3 200 entreprises · 73% des emplois" },
    ]
  },
  smr: {
    label: "Startups, SMR & réacteurs innovants",
    icon: "🚀",
    color: "#D85A30",
    bg: "#FAECE7",
    items: [
      { name: "NUWARD — 2×170 MWe", desc: "SMR Gen III+ porté par EDF, CEA, Naval Group, TechnicAtome, Framatome, Tractebel. Objectif export & remplacement charbon. Design revu en 2024. Financement France 2030 : ~500 M€. Premier béton visé début 2030s.", type: "SMR — REP", status: "En développement" },
      { name: "Calogena — CAL-30", desc: "Groupe Gorgé. Réacteur calogène ~30 MWth pour réseaux de chaleur urbains (70-110°C). Dossier de sûreté déposé (ASNR, oct. 2024). Lettre d'intention CEA pour site Cadarache. Filiale en Finlande (2025). Levée 100 M€ (mars 2026). Lauréat France 2030 phases 1 et 2.", type: "Micro — Chaleur", status: "Phase 2 France 2030" },
      { name: "Jimmy Energy — HTR", desc: "Réacteur haute température 20-60 MWth (470°C). Cible : chimie, hydrogène, métallurgie, biocarburants. DAC déposée (ASNR, 2024, puis design revu sept. 2025). Site visé : Bazancourt. Partenariat Onet Technologies. Levée 80 M€ (mars 2026).", type: "Micro — Industrie", status: "Phase 2 France 2030" },
      { name: "Hexana", desc: "Spin-off CEA (juin 2023). Réacteur à neutrons rapides refroidi au sodium (RNR-Na), 2×400 MWth intégré + stockage énergie. Chaleur 500°C + électricité. Fermeture du cycle, valorisation Pu. Partenariats EDF, Framatome, Orano.", type: "Gen IV — Sodium", status: "Phase 1 France 2030" },
      { name: "Stellaria", desc: "Spin-off CEA. Réacteur à sels de chlorure, 100 MWe / 250 MWth. Pile régénératrice de combustibles usés. Autonomie ~5 ans sans rechargement. Basse pression, pilotable. Verrous technologiques majeurs à lever.", type: "Gen IV — Sels fondus", status: "Phase 1 France 2030" },
      { name: "Newcleo", desc: "Franco-italienne (siège : Londres, R&D : Lyon et Turin). Réacteur à neutrons rapides refroidi au plomb (LFR-30, 30 MWe). Lauréat France 2030 (juin 2023). Difficultés financières signalées fin 2025.", type: "Gen IV — Plomb", status: "Difficultés" },
      { name: "Blue Capsule", desc: "Spin-off CEA. Réacteur haute température à caloporteur sodium. Lauréat France 2030 (nov. 2023). Phase de R&D initiale.", type: "HTR — Sodium", status: "Phase 1 France 2030" },
      { name: "Otrera Nuclear Energy", desc: "Spin-off CEA. Réacteur à neutrons rapides refroidi au sodium. Issu du programme Astrid. Lauréat France 2030 (nov. 2023).", type: "Gen IV — Sodium", status: "Phase 1 France 2030" },
      { name: "Renaissance Fusion", desc: "Start-up grenobloise. Concept de réacteur de fusion compact (stellarator) à aimants supraconducteurs haute température. Lauréat France 2030 (nov. 2023).", type: "Fusion", status: "Phase 1 France 2030" },
      { name: "Naarea ✕", desc: "Réacteur XAMR à sels fondus rapides. Lauréat France 2030 (juin 2023). Redressement judiciaire sept. 2025, tentative de reprise Eneris échouée, liquidation prononcée 2026.", type: "Gen IV — Sels fondus", status: "Liquidée" },
    ]
  },
  programmes: {
    label: "Programmes & cadre réglementaire",
    icon: "📋",
    color: "#639922",
    bg: "#EAF3DE",
    items: [
      { name: "Prolongation 60 ans+", desc: "Prolongation de la durée de vie des 57 réacteurs sous contrôle ASNR. Visites décennales tous les 10 ans. Grand carénage : ~50 Md€ d'investissements. Pas de durée de vie max réglementaire.", type: "Parc existant" },
      { name: "Programme EPR2 — 6 réacteurs", desc: "Penly (2, Seine-Maritime — travaux préparatoires 2024), Gravelines (2, Nord — instruction dossier jusqu'à automne 2026), Bugey (2, Ain — contestation juridique urbanisme). Devis total estimé ~67 Md€. Mise en service 1er EPR2 : ~2037.", type: "Nouveau nucléaire" },
      { name: "EPR2 — 8 supplémentaires (étude)", desc: "Possibilité de 8 EPR2 additionnels à l'horizon 2050. Sites à identifier. Loi d'accélération du nucléaire (juin 2023) facilite les procédures.", type: "Nouveau nucléaire" },
      { name: "France 2030 — Réacteurs innovants", desc: "~1 milliard d'euros. NUWARD (~500 M€) + startups Gen IV (~500 M€). 11 lauréats sélectionnés en 2 phases (2023). CEA : appui technique 27,8 M€. Phase 2 lancée 2026 (Jimmy, Calogena).", type: "Innovation", chiffres: "~1 Md€ · 11 lauréats" },
      { name: "Cigéo", desc: "Stockage géologique profond réversible à Bure (Meuse/Haute-Marne). Géré par l'ANDRA. Pour déchets HA et MA-VL. 500 m de profondeur dans l'argile. Mise en service prévue ~2035-2040.", type: "Déchets" },
      { name: "VNU & fin de l'ARENH", desc: "Versement nucléaire universel : taxe progressive sur les revenus nucléaires d'EDF (50% au-delà de 5-25 €/MWh d'écart, 90% au-delà de 35 €/MWh). Remplace l'ARENH (42 €/MWh, fin 2025).", type: "Régulation prix" },
      { name: "CAPN", desc: "Contrats d'allocation de production nucléaire. Contrats bilatéraux EDF ↔ fournisseurs alternatifs, poussés par le gouvernement pour pallier la fin de l'ARENH.", type: "Régulation prix" },
      { name: "Contrat de filière 2025-2028", desc: "Signé le 10 juin 2025 au CNI. Feuille de route État-industriels : compétences (100 000 recrutements en 10 ans), souveraineté, achats responsables, export, innovation, cybersécurité.", type: "Politique industrielle" },
      { name: "PPE / SNBC", desc: "Programmation pluriannuelle de l'énergie et Stratégie nationale bas carbone. Consultation publique fin 2024. Objectif 50% nucléaire repoussé à 2035. Contribution SFEN publiée.", type: "Planification" },
      { name: "Sommet énergie nucléaire Paris (mars 2026)", desc: "Fonds de garantie UE 200 M€ pour investissements nucléaires. France appelle au financement européen des SMR. Alliance SMR industrielle européenne.", type: "International" },
    ]
  },
  formation: {
    label: "Formation, emploi & réseaux",
    icon: "🎓",
    color: "#993556",
    bg: "#FBEAF0",
    items: [
      { name: "GIFEN", desc: "Groupement des industriels français de l'énergie nucléaire. 400 adhérents. Syndicat professionnel unique depuis 2018. 8 commissions. Programme MATCH (84 métiers cœurs, 20 en tension). Organise le WNE.", type: "Syndicat professionnel", chiffres: "400 adhérents" },
      { name: "SFEN", desc: "Société française d'énergie nucléaire. Depuis 1973. Diffusion des connaissances, publication de la Revue Générale Nucléaire (RGN). Organisation d'événements.", type: "Association savante" },
      { name: "Nuclear Valley", desc: "Pôle de compétitivité nucléaire et défense. 400+ membres. Basé en Auvergne-Rhône-Alpes (1re région électronucléaire : 4 centrales, 14 réacteurs, 22% production nationale).", type: "Pôle de compétitivité", chiffres: "400+ membres · 1 300 entreprises AURA" },
      { name: "UMN", desc: "Université des métiers du nucléaire. Lancée avril 2021. Facilite l'intégration des jeunes, projets locaux de formation, bourses (Bac Pro, Bac+2, CAP).", type: "Formation" },
      { name: "IRUP / ISTP", desc: "Leaders français de l'apprentissage dans le nucléaire. 20 000 recrutements prévus d'ici 2035 au niveau national en AURA.", type: "Formation" },
      { name: "France Travail", desc: "Convention signée avec EDF pour les alternants. Reclassement chez les sous-traitants. Forums de l'emploi nucléaire. Accompagnement reconversion.", type: "Emploi" },
      { name: "WNE", desc: "World Nuclear Exhibition. Salon international organisé par le GIFEN à Villepinte (Paris). Vitrine mondiale de la filière française. Prochaine édition 2025.", type: "Événement" },
      { name: "FORATOM / ENS", desc: "Forum atomique européen (Bruxelles). European Nuclear Society. Représentation de l'industrie nucléaire au niveau européen.", type: "International" },
      { name: "Organisations syndicales", desc: "CGT, CFDT, CFE-CGC, FO, etc. Dialogue social au sein des exploitants et sous-traitants. Rôle dans la sûreté et les conditions de travail.", type: "Social" },
    ]
  },
  defense: {
    label: "Nucléaire militaire & dual",
    icon: "🛡",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    items: [
      { name: "CEA/DAM", desc: "Direction des applications militaires du CEA. Conception, fabrication, maintien en condition des armes nucléaires françaises. Sites : Valduc, Ripault, Le Barp, Île Longue, CESTA.", type: "Dissuasion" },
      { name: "Marine nationale — 12 réacteurs", desc: "10 sous-marins (4 SNLE Triomphant + 6 SNA dont 1 Suffren livré) et 1 porte-avions (Charles de Gaulle). Chaufferies conçues par TechnicAtome.", type: "Propulsion navale" },
      { name: "Programme SNLE 3G", desc: "Sous-marins nucléaires lanceurs d'engins de 3e génération. Remplacement des SNLE Triomphant à horizon 2030s. Naval Group + TechnicAtome.", type: "Programme" },
      { name: "Porte-avions nouvelle génération (PANG)", desc: "Programme de porte-avions à propulsion nucléaire. Remplacement du Charles de Gaulle. Livraison prévue ~2038. 2 réacteurs K22.", type: "Programme" },
    ]
  },
  international: {
    label: "Coopérations & export",
    icon: "🌍",
    color: "#185FA5",
    bg: "#E6F1FB",
    items: [
      { name: "AIEA", desc: "Agence internationale de l'énergie atomique (Vienne). Garanties, non-prolifération, sûreté. La France est membre fondateur et contributeur majeur.", type: "International" },
      { name: "Alliance nucléaire européenne", desc: "Coalition de 14+ États membres pro-nucléaire. Portée par la France. Reconnaissance du nucléaire dans la taxonomie verte (2022) et le Net Zero Industry Act.", type: "UE" },
      { name: "Alliance SMR industrielle (UE)", desc: "Lancée en 2024. Soutien au déploiement des SMR en Europe. Projet CityHeat (Calogena). Fonds de garantie 200 M€ annoncé au sommet de Paris (mars 2026).", type: "UE" },
      { name: "Export EPR", desc: "Hinkley Point C (UK, 2 EPR en construction). Sizewell C (UK, approuvé). Jaitapur (Inde, 6 EPR en discussion). Projets en République tchèque, Pologne, etc.", type: "Export" },
      { name: "ITER", desc: "Réacteur thermonucléaire expérimental international. Site : Cadarache. 35 pays. Objectif : démontrer la faisabilité de la fusion contrôlée. France pays hôte.", type: "Fusion" },
    ]
  }
};

const CATEGORIES = Object.keys(DATA);


const TOTAL_ENTITIES = Object.values(DATA).reduce((sum, section) => sum + section.items.length, 0);

const QUICK_STATS = [
  { v: "57", l: "Réacteurs REP" },
  { v: "18", l: "Centrales" },
  { v: "373 TWh", l: "Production 2025" },
  { v: "63 GW", l: "Puissance installée" },
  { v: "3 200", l: "Entreprises" },
  { v: "250 000", l: "Emplois (2025)" },
  { v: "~67 Md€", l: "Devis EPR2" },
  { v: "~1 Md€", l: "France 2030 SMR" },
];

function AppHeader({ view, setView }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(14px)", background: "rgba(245,247,251,0.78)", borderBottom: "1px solid rgba(148,163,184,0.16)" }}>
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#64748b", fontWeight: 700 }}>Cartographie interactive</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Nucléaire français</div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setView("chooser")} style={topButtonStyle(view === "chooser", "#0f172a")}>Accueil</button>
          <button onClick={() => setView("map")} style={topButtonStyle(view === "map", "#6d28d9")}>Carte mentale</button>
          <button onClick={() => setView("list")} style={topButtonStyle(view === "list", "#0f766e")}>Vue détaillée</button>
        </div>
      </div>
    </div>
  );
}

function HomeChooser({ setView }) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 18px 60px" }}>
      <div style={{ background: "radial-gradient(circle at top left, rgba(109,40,217,0.12), transparent 34%), radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 30, padding: "28px 24px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 14px", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(148,163,184,0.18)", color: "#475569", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
            <span>⚛</span>
            <span>{TOTAL_ENTITIES} entités · 12 catégories · données 2025/2026</span>
          </div>
          <h1 style={{ margin: "18px 0 10px", fontSize: "clamp(30px, 5vw, 56px)", lineHeight: 1.03, color: "#0f172a" }}>Choisis ta façon d’explorer la filière nucléaire française</h1>
          <p style={{ margin: "0 auto", maxWidth: 660, fontSize: 17, lineHeight: 1.65, color: "#475569" }}>
            Une entrée plus visuelle et plus ludique, ou la vue détaillée actuelle pour lire toutes les fiches.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 28 }}>
          <button onClick={() => setView("map")} style={{ ...choiceCardStyle, background: "linear-gradient(145deg, #faf5ff 0%, #eef2ff 100%)" }}>
            <div style={{ ...iconBubbleStyle, background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>🧠</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#1e1b4b" }}>Carte mentale</div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: "#4338ca" }}>Une navigation par grands pôles, avec nœuds colorés, connexions visuelles et exploration plus immersive.</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={tagPillStyle("#ede9fe", "#5b21b6")}>Visuelle</span>
              <span style={tagPillStyle("#ede9fe", "#5b21b6")}>Ludique</span>
              <span style={tagPillStyle("#ede9fe", "#5b21b6")}>Exploration libre</span>
            </div>
            <div style={{ marginTop: "auto", fontWeight: 700, color: "#5b21b6" }}>Ouvrir la carte mentale →</div>
          </button>

          <button onClick={() => setView("list")} style={{ ...choiceCardStyle, background: "linear-gradient(145deg, #f0fdfa 0%, #f8fafc 100%)" }}>
            <div style={{ ...iconBubbleStyle, background: "linear-gradient(135deg, #0f766e, #06b6d4)" }}>🗂</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#134e4a" }}>Vue détaillée</div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: "#0f766e" }}>La vue actuelle avec recherche, filtres, cartes d’informations et lecture complète de chaque acteur.</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={tagPillStyle("#ccfbf1", "#0f766e")}>Précise</span>
              <span style={tagPillStyle("#ccfbf1", "#0f766e")}>Recherche</span>
              <span style={tagPillStyle("#ccfbf1", "#0f766e")}>Fiches complètes</span>
            </div>
            <div style={{ marginTop: "auto", fontWeight: 700, color: "#0f766e" }}>Ouvrir la vue détaillée →</div>
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 18 }}>
        {QUICK_STATS.map((s) => (
          <div key={s.l} style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "14px 16px", border: "1px solid rgba(148,163,184,0.18)", boxShadow: "0 12px 30px rgba(15,23,42,0.05)" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MindMapView() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const activeSection = DATA[activeCat];
  const activeItem = activeSection.items[activeItemIndex] || activeSection.items[0];

  const positions = useMemo(() => {
    const centerX = 460;
    const centerY = 310;
    const radiusX = 315;
    const radiusY = 220;

    return CATEGORIES.map((key, index) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * index) / CATEGORIES.length;
      return {
        key,
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY,
      };
    });
  }, []);

  const exploreRandom = () => {
    const randomCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const items = DATA[randomCat].items;
    const randomItemIndex = Math.floor(Math.random() * items.length);
    setActiveCat(randomCat);
    setActiveItemIndex(randomItemIndex);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "26px 18px 52px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9", letterSpacing: ".08em", textTransform: "uppercase" }}>Vue immersive</div>
          <h2 style={{ margin: "6px 0 8px", fontSize: "clamp(26px, 4vw, 40px)", color: "#0f172a" }}>Carte mentale esthétique et ludique</h2>
          <p style={{ margin: 0, maxWidth: 760, color: "#475569", lineHeight: 1.6, fontSize: 15 }}>
            Clique sur un grand pôle autour du noyau central, puis explore les acteurs dans le panneau en dessous. Le bouton aléatoire te fait voyager dans la carte.
          </p>
        </div>

        <button onClick={exploreRandom} style={{ ...topButtonStyle(false, "#d97706"), background: "linear-gradient(135deg, #f59e0b, #ea580c)", color: "#fff", border: "none", boxShadow: "0 16px 34px rgba(234,88,12,0.18)" }}>
          Explorer au hasard ✨
        </button>
      </div>

      <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,250,252,0.96))", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 30, padding: 18, boxShadow: "0 26px 70px rgba(15,23,42,0.08)" }}>
        <div style={{ overflowX: "auto", paddingBottom: 6 }}>
          <div style={{ position: "relative", minWidth: 920, height: 650, borderRadius: 24, overflow: "hidden", background: "radial-gradient(circle at center, rgba(129,140,248,0.12) 0%, rgba(255,255,255,0) 28%), radial-gradient(circle at 18% 20%, rgba(34,197,94,0.08), transparent 22%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08), transparent 20%), linear-gradient(180deg, #ffffff, #f8fbff)" }}>
            <svg width="920" height="650" style={{ position: "absolute", inset: 0 }}>
              {positions.map((node) => {
                const isActive = node.key === activeCat;
                return (
                  <line
                    key={node.key}
                    x1="460"
                    y1="310"
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? DATA[node.key].color : "rgba(148,163,184,0.45)"}
                    strokeWidth={isActive ? "3.5" : "1.6"}
                    strokeDasharray={isActive ? "0" : "4 7"}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 210, height: 210, borderRadius: "50%", background: "linear-gradient(135deg, #111827, #334155)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 22, boxShadow: "0 26px 50px rgba(15,23,42,0.22)" }}>
              <div style={{ fontSize: 38, marginBottom: 4 }}>⚛</div>
              <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".12em", opacity: 0.75 }}>Noyau</div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, marginTop: 6 }}>Nucléaire français</div>
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>{TOTAL_ENTITIES} entités interconnectées</div>
            </div>

            {positions.map((node) => {
              const section = DATA[node.key];
              const active = node.key === activeCat;
              return (
                <button
                  key={node.key}
                  onClick={() => {
                    setActiveCat(node.key);
                    setActiveItemIndex(0);
                  }}
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                    width: active ? 180 : 164,
                    minHeight: active ? 112 : 100,
                    padding: "14px 16px",
                    borderRadius: 24,
                    border: active ? `2px solid ${section.color}` : "1px solid rgba(148,163,184,0.18)",
                    background: active ? `linear-gradient(135deg, ${section.bg}, #ffffff)` : "rgba(255,255,255,0.92)",
                    color: "#0f172a",
                    boxShadow: active ? `0 20px 42px ${hexToRgba(section.color, 0.22)}` : "0 10px 24px rgba(15,23,42,0.08)",
                    cursor: "pointer",
                    transition: "transform .18s ease, box-shadow .18s ease, width .18s ease",
                    textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 23 }}>{section.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 999, background: active ? "#fff" : section.bg, color: section.color }}>{section.items.length}</span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{section.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr .95fr", gap: 16, marginTop: 18 }}>
          <div style={panelStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ ...iconBubbleStyle, width: 48, height: 48, fontSize: 22, background: activeSection.bg, color: activeSection.color, boxShadow: "none" }}>{activeSection.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: activeSection.color, letterSpacing: ".08em", textTransform: "uppercase" }}>Catégorie active</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{activeSection.label}</div>
              </div>
            </div>
            <p style={{ margin: "14px 0 0", color: "#475569", lineHeight: 1.65, fontSize: 14 }}>
              Clique sur une bulle ci-dessous pour afficher son détail. La carte est pensée comme une porte d’entrée visuelle : rapide, claire et agréable à parcourir.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              {activeSection.items.map((item, index) => {
                const selected = index === activeItemIndex;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveItemIndex(index)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 16,
                      border: selected ? `1.5px solid ${activeSection.color}` : "1px solid rgba(148,163,184,0.18)",
                      background: selected ? activeSection.bg : "#fff",
                      color: selected ? activeSection.color : "#334155",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: selected ? `0 10px 24px ${hexToRgba(activeSection.color, 0.16)}` : "none"
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ ...panelStyle, background: "linear-gradient(180deg, #ffffff, #fbfdff)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 9px", borderRadius: 999, background: activeSection.bg, color: activeSection.color }}>{activeItem.type}</span>
              {activeItem.status && (
                <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 9px", borderRadius: 999, background: activeItem.status === "Liquidée" ? "#FCEBEB" : activeItem.status === "Difficultés" ? "#FEF3C7" : "#DCFCE7", color: activeItem.status === "Liquidée" ? "#A32D2D" : activeItem.status === "Difficultés" ? "#92400e" : "#166534" }}>{activeItem.status}</span>
              )}
            </div>
            <div style={{ fontSize: 25, fontWeight: 900, color: "#0f172a", lineHeight: 1.15 }}>{activeItem.name}</div>
            <div style={{ marginTop: 14, fontSize: 14, color: "#475569", lineHeight: 1.72 }}>{activeItem.desc}</div>
            {activeItem.chiffres && (
              <div style={{ marginTop: 14, display: "inline-block", padding: "7px 12px", borderRadius: 12, background: activeSection.bg, color: activeSection.color, fontSize: 12, fontWeight: 800 }}>{activeItem.chiffres}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  const filteredData = useMemo(() => {
    const cats = activeCat === "all" ? CATEGORIES : [activeCat];
    const q = search.toLowerCase().trim();
    const result = {};
    cats.forEach(c => {
      const section = DATA[c];
      const items = section.items.filter(item => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || (item.type && item.type.toLowerCase().includes(q));
      });
      if (items.length > 0) result[c] = { ...section, items };
    });
    return result;
  }, [activeCat, search]);

  const totalItems = useMemo(() => {
    return Object.values(filteredData).reduce((s, sec) => s + sec.items.length, 0);
  }, [filteredData]);

  const toggleExpand = (key) => {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ maxWidth: 1260, margin: "0 auto", padding: "26px 18px 52px" }}>
      <div style={{ textAlign: "center", padding: "0 0 0.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 14px", background: "rgba(255,255,255,0.82)", border: "1px solid rgba(148,163,184,0.18)", color: "#0f766e", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
          <span>🗂</span>
          <span>Vue détaillée</span>
        </div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "16px 0 8px", color: "#0f172a" }}>Cartographie complète du nucléaire français</h2>
        <p style={{ fontSize: 15, color: "#64748b", margin: 0 }}>
          {totalItems} entités cartographiées — 12 catégories — données 2025/2026
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, margin: "1.25rem 0" }}>
        {QUICK_STATS.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.84)", borderRadius: 18, padding: "10px 14px", textAlign: "center", border: "1px solid rgba(148,163,184,0.14)", boxShadow: "0 12px 30px rgba(15,23,42,0.05)" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a" }}>{s.v}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: "1rem 0", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Rechercher un acteur, un site, une technologie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 580, padding: "12px 16px", fontSize: 14, borderRadius: 999, border: "1px solid rgba(148,163,184,0.18)", background: "rgba(255,255,255,0.92)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", outline: "none", boxShadow: "0 12px 34px rgba(15,23,42,0.05)" }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", margin: "0.75rem 0 1.6rem" }}>
        <button onClick={() => setActiveCat("all")} style={{ ...filterButtonStyle(activeCat === "all", "#0f172a"), background: activeCat === "all" ? "#0f172a" : "rgba(255,255,255,0.86)" }}>
          Tout ({Object.values(DATA).reduce((s, d) => s + d.items.length, 0)})
        </button>
        {CATEGORIES.map(c => {
          const d = DATA[c];
          const active = activeCat === c;
          return (
            <button key={c} onClick={() => setActiveCat(c)} style={{ ...filterButtonStyle(active, d.color), background: active ? d.color : "rgba(255,255,255,0.86)" }}>
              {d.icon} {d.label.split("—")[0].split("&")[0].trim()} ({d.items.length})
            </button>
          );
        })}
      </div>

      {Object.entries(filteredData).map(([key, section]) => (
        <div key={key} style={{ marginBottom: "1.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 12px 2px", flexWrap: "wrap" }}>
            <span style={{ fontSize: 18 }}>{section.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: section.color, textTransform: "uppercase", letterSpacing: ".08em" }}>{section.label}</span>
            <span style={{ fontSize: 11, color: "#64748b" }}>({section.items.length})</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {section.items.map((item, i) => {
              const cardKey = key + "-" + i;
              const expanded = expandedCards[cardKey];
              const isLong = item.desc.length > 220;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 22, padding: "14px 15px", transition: "transform .18s ease, box-shadow .18s ease", cursor: isLong ? "pointer" : "default", boxShadow: "0 16px 34px rgba(15,23,42,0.05)" }} onClick={() => isLong && toggleExpand(cardKey)}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 999, background: section.bg, color: section.color, whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>{item.type}</span>
                    <span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, color: "#0f172a" }}>{item.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.62, overflow: "hidden", maxHeight: expanded || !isLong ? "none" : 78, transition: "max-height .3s" }}>
                    {item.desc}
                  </div>
                  {item.chiffres && (
                    <div style={{ marginTop: 8, fontSize: 11, fontWeight: 800, color: section.color, background: section.bg, padding: "4px 9px", borderRadius: 10, display: "inline-block" }}>{item.chiffres}</div>
                  )}
                  {item.status && (
                    <div style={{ marginTop: 8, fontSize: 11, fontWeight: 800, padding: "4px 9px", borderRadius: 999, display: "inline-block", background: item.status === "Liquidée" ? "#FCEBEB" : item.status === "Difficultés" ? "#FAEEDA" : "#EAF3DE", color: item.status === "Liquidée" ? "#A32D2D" : item.status === "Difficultés" ? "#854F0B" : "#3B6D11" }}>{item.status}</div>
                  )}
                  {isLong && (
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 6, fontWeight: 700 }}>
                      {expanded ? "▲ réduire" : "▼ voir plus"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", padding: "1.5rem 0 1rem", fontSize: 11, color: "#64748b" }}>
        Sources : ASNR, EDF, CEA, GIFEN, SFEN, France 2030, CSFN, Xerfi — Données consolidées avril 2026
      </div>
    </div>
  );
}

function topButtonStyle(active, accent) {
  return {
    border: "1px solid rgba(148,163,184,0.18)",
    background: active ? accent : "rgba(255,255,255,0.86)",
    color: active ? "#fff" : "#334155",
    padding: "10px 14px",
    borderRadius: 999,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: active ? `0 14px 28px ${hexToRgba(accent, 0.22)}` : "0 8px 18px rgba(15,23,42,0.05)",
  };
}

function filterButtonStyle(active, accent) {
  return {
    fontSize: 12,
    padding: "8px 12px",
    borderRadius: 999,
    border: active ? "1px solid transparent" : "1px solid rgba(148,163,184,0.18)",
    color: active ? "#fff" : "#475569",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    transition: "all .2s",
    fontWeight: 700,
    boxShadow: active ? `0 14px 28px ${hexToRgba(accent, 0.18)}` : "0 8px 18px rgba(15,23,42,0.04)",
  };
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const choiceCardStyle = {
  border: "1px solid rgba(148,163,184,0.18)",
  borderRadius: 28,
  padding: "22px",
  minHeight: 270,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  textAlign: "left",
  cursor: "pointer",
  boxShadow: "0 22px 50px rgba(15,23,42,0.06)",
};

const iconBubbleStyle = {
  width: 56,
  height: 56,
  borderRadius: 18,
  display: "grid",
  placeItems: "center",
  color: "#fff",
  fontSize: 27,
  boxShadow: "0 18px 30px rgba(79,70,229,0.22)",
};

const panelStyle = {
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(148,163,184,0.16)",
  borderRadius: 24,
  padding: 18,
  boxShadow: "0 18px 42px rgba(15,23,42,0.05)",
};

function tagPillStyle(bg, color) {
  return {
    background: bg,
    color,
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 700,
  };
}

export default function App() {
  const [view, setView] = useState("chooser");

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f5f7fb 0%, #eef4ff 100%)", color: "var(--color-text-primary)" }}>
      <AppHeader view={view} setView={setView} />
      {view === "chooser" && <HomeChooser setView={setView} />}
      {view === "map" && <MindMapView />}
      {view === "list" && <ListView />}
    </div>
  );
}
