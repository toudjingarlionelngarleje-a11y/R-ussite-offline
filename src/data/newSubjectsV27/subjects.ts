import { Subject } from '../../types';

/**
 * v27.0 — Huit nouvelles matières de métiers, de terrain et de protocole.
 * Chacune reçoit 80 chapitres dédiés (8 modules × 10 étapes illustrées), puis
 * 10 chapitres d'approfondissement v27.0, soit 90 chapitres et sa galerie SVG.
 */
export const NEW_SUBJECTS_V27: Subject[] = [
  {
    id: 'coiffure_barbier',
    name: 'Coiffure & barbier professionnel',
    shortName: 'Coiffure',
    examIds: ['certif-pro', 'bepc', 'bac-f-industriel'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1'],
    color: '#9D174D',
    icon: 'Scissors',
    description:
      '90 chapitres : diagnostic capillaire, hygiène et stérilisation, coupe structurée, dégradés et dégradés américains, coloration, soins et défrisage, barbe et rasage, accueil et gestion du salon.',
    sizeKb: 345,
  },
  {
    id: 'plomberie_sanitaire',
    name: 'Plomberie, sanitaires & réseaux',
    shortName: 'Plomberie',
    examIds: ['certif-pro', 'bac-f-industriel', 'concours-energie-btp'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#0369A1',
    icon: 'Droplets',
    description:
      '90 chapitres : lecture de plans, alimentation en eau, évacuation et ventilation, matériaux et raccords, sanitaires, chauffe-eau, dépannage et énergies renouvelables.',
    sizeKb: 350,
  },
  {
    id: 'maintenance_automobile',
    name: 'Maintenance automobile & diagnostic',
    shortName: 'Maintenance auto',
    examIds: ['certif-pro', 'bac-f-industriel', 'bts-genie-electrique'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#B91C1C',
    icon: 'Car',
    description:
      '90 chapitres : organisation de l’atelier, moteur thermique, électricité et électronique embarquée, freinage, suspension, diagnostic OBD, entretien et sécurité.',
    sizeKb: 355,
  },
  {
    id: 'soudage_chaudronnerie',
    name: 'Soudage & chaudronnerie',
    shortName: 'Soudage',
    examIds: ['certif-pro', 'bac-f-industriel', 'concours-genie-mecanique-procedes'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1'],
    color: '#78716C',
    icon: 'Flame',
    description:
      '90 chapitres : plans et tracés, métaux et soudures, procédés à l’arc, TIG et MIG-MAG, contrôle des soudures, chaudronnerie, sécurité et chiffrage.',
    sizeKb: 350,
  },
  {
    id: 'apiculture_ruche',
    name: 'Apiculture & produits de la ruche',
    shortName: 'Apiculture',
    examIds: ['concours-agronomie', 'certif-pro', 'concours-foresterie-agroalimentaire'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#CA8A04',
    icon: 'Hexagon',
    description:
      '90 chapitres : biologie de l’abeille, colonie et cadres, conduite du rucher, produits de la ruche, santé des abeilles, pollinisation, transformation et commercialisation.',
    sizeKb: 340,
  },
  {
    id: 'viticulture_oenologie',
    name: 'Viticulture & œnologie',
    shortName: 'Viticulture',
    examIds: ['concours-agronomie', 'certif-pro', 'concours-foresterie-agroalimentaire'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3'],
    color: '#7E22CE',
    icon: 'Grape',
    description:
      '90 chapitres : vigne et terroir, plantation et taille, protection du vignoble, maturité et vendange, vinification, élevage, dégustation et réglementation.',
    sizeKb: 350,
  },
  {
    id: 'gemmologie_joaillerie',
    name: 'Gemmologie & joaillerie',
    shortName: 'Gemmologie',
    examIds: ['certif-pro', 'certif-metiers-creatifs-digital', 'concours-mines-petrole'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#0F766E',
    icon: 'Gem',
    description:
      '90 chapitres : minéraux et cristallographie, identification des gemmes, taille et facettes, métaux précieux, sertissage, bijouterie, expertise et commerce.',
    sizeKb: 345,
  },
  {
    id: 'protocole_diplomatique',
    name: 'Protocole & cérémonial diplomatique',
    shortName: 'Protocole',
    examIds: ['concours-diplomatie', 'concours-diplomatie-iric', 'concours-admin'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#1E3A8A',
    icon: 'Flag',
    description:
      '90 chapitres : préséance et rangs, invitations et tables, visites officielles, drapeaux et hymnes, correspondance diplomatique, événements multilatéraux et gestion des incidents.',
    sizeKb: 350,
  },
];
