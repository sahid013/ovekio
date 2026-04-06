"use client";

import { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";

/* ---- Step 1 Data ---- */

const step1Options = [
  {
    id: "site",
    title: "Site Web",
    description: "Visibilité & Conversion",
    icon: "globe",
  },
  {
    id: "logiciel",
    title: "Logiciel sur mesure",
    description: "CRM, outil interne, plateforme métier",
    icon: "cog",
  },
  {
    id: "webapp",
    title: "Application Web",
    description: "SaaS, MVP, produit digital",
    icon: "code",
  },
  {
    id: "ia",
    title: "IA & Automatisation",
    description: "Automatisation, intégration IA",
    icon: "spark",
  },
];

/* ---- Step 2 Data ---- */

type SubOption = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
};

const step2Options: Record<string, SubOption[]> = {
  site: [
    {
      id: "landing",
      title: "Landing Page",
      description: "Une seule page, pensée pour convertir",
      price: "1 400 - 2 900 EUR",
      icon: "landing",
    },
    {
      id: "vitrine",
      title: "Site Vitrine",
      description: "Plusieurs pages, pour présenter votre activité",
      price: "2 000 - 5 000 EUR",
      icon: "vitrine",
    },
    {
      id: "ecommerce",
      title: "Site E-commerce",
      description: "Vendez vos produits ou services en ligne",
      price: "3 000 - 18 000 EUR",
      icon: "cart",
    },
    {
      id: "refonte",
      title: "Refonte",
      description: "Vous avez déjà un site, on le modernise",
      price: "Sur devis",
      icon: "refresh",
    },
  ],
  logiciel: [
    {
      id: "crm",
      title: "CRM",
      description: "Gérez vos contacts, clients et suivi commercial",
      price: "6 000 - 22 000 EUR",
      icon: "users",
    },
    {
      id: "outil-interne",
      title: "Outil interne",
      description: "Automatisez un process spécifique à votre métier",
      price: "3 000 - 13 000 EUR",
      icon: "wrench",
    },
    {
      id: "plateforme-metier",
      title: "Plateforme métier complète",
      description: "Un écosystème sur mesure pour piloter toute votre activité",
      price: "10 000 - 35 000 EUR",
      icon: "layers",
    },
    {
      id: "sur-mesure-logiciel",
      title: "Sur mesure / Autre",
      description: "Votre besoin ne rentre dans aucune case",
      price: "Sur devis",
      icon: "puzzle",
    },
  ],
  webapp: [
    {
      id: "mvp",
      title: "MVP",
      description: "Testez votre idée avec une première version fonctionnelle",
      price: "4 000 - 18 000 EUR",
      icon: "rocket",
    },
    {
      id: "saas",
      title: "SaaS",
      description: "Un produit en ligne que vous vendez à vos clients",
      price: "13 000 - 40 000 EUR",
      icon: "cloud",
    },
    {
      id: "sur-mesure-webapp",
      title: "Sur mesure / Autre",
      description: "Votre projet ne rentre dans aucune case",
      price: "Sur devis",
      icon: "puzzle",
    },
  ],
  ia: [
    {
      id: "automatisation",
      title: "Automatisation de process",
      description: "Connectez vos outils, éliminez les tâches répétitives",
      price: "1 500 - 8 000 EUR",
      icon: "zap",
    },
    {
      id: "ia-integree",
      title: "IA intégrée à un produit",
      description: "Ajoutez une couche IA à votre logiciel existant",
      price: "4 000 - 20 000 EUR",
      icon: "brain",
    },
    {
      id: "sur-mesure-ia",
      title: "Sur mesure / Autre",
      description: "Votre besoin est spécifique, on construit",
      price: "Sur devis",
      icon: "puzzle",
    },
  ],
};

const defaultSubOption: Record<string, string> = {
  site: "landing",
  logiciel: "crm",
  webapp: "mvp",
  ia: "automatisation",
};

/* ---- Step 3 Data ---- */

type Step3Option = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  visibleFor: string[];
};

const step3Options: Step3Option[] = [
  {
    id: "motion",
    title: "Motion Design",
    description: "Animations et transitions pour un site qui marque",
    price: "À partir de 1 400 EUR",
    icon: "motion",
    visibleFor: ["site"],
  },
  {
    id: "visitors",
    title: "Visitors (taap.it)",
    description: "Trackez vos visites et conversions",
    price: "30 EUR / mois",
    icon: "chart",
    visibleFor: ["site", "logiciel", "webapp", "ia"],
  },
  {
    id: "support",
    title: "Support & Maintenance",
    description: "On s'occupe de tout après le lancement",
    price: "Sur devis",
    icon: "shield",
    visibleFor: ["site", "webapp", "ia"],
  },
  {
    id: "landing-extra",
    title: "Landing Page",
    description: "Une seule page, pensée pour convertir",
    price: "1 400 - 2 900 EUR",
    icon: "landing",
    visibleFor: ["logiciel", "webapp", "ia"],
  },
  {
    id: "vitrine-extra",
    title: "Site Vitrine",
    description: "Plusieurs pages, pour présenter votre activité",
    price: "2 000 - 5 000 EUR",
    icon: "vitrine",
    visibleFor: ["logiciel", "webapp", "ia"],
  },
];

/* ---- Icons ---- */

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="10" stroke="#8B5CF6" strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="5" ry="10" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M4 14H24" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 8H21.5" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 20H21.5" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C16.2091 18 18 16.2091 18 14C18 11.7909 16.2091 10 14 10C11.7909 10 10 11.7909 10 14C10 16.2091 11.7909 18 14 18Z" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M14 4V6M14 22V24M4 14H6M22 14H24M7.05 7.05L8.46 8.46M19.54 19.54L20.95 20.95M20.95 7.05L19.54 8.46M8.46 19.54L7.05 20.95" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 9L5 14L10 19" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9L23 14L18 19" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5L12 23" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L14 7" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 21L14 25" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 14H7" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 14H25" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8C14 8 16.5 11.5 16.5 14C16.5 16.5 14 20 14 20C14 20 11.5 16.5 11.5 14C11.5 11.5 14 8 14 8Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 14C8 14 11.5 11.5 14 11.5C16.5 11.5 20 14 20 14C20 14 16.5 16.5 14 16.5C11.5 16.5 8 14 8 14Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LandingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M4 10H24" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1" fill="#8B5CF6" />
      <circle cx="10" cy="7" r="1" fill="#8B5CF6" />
      <circle cx="13" cy="7" r="1" fill="#8B5CF6" />
      <path d="M9 15H19" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 19H17" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VitrineIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="9" height="20" rx="1.5" stroke="#8B5CF6" strokeWidth="1.5" />
      <rect x="16" y="4" width="9" height="9" rx="1.5" stroke="#8B5CF6" strokeWidth="1.5" />
      <rect x="16" y="17" width="9" height="7" rx="1.5" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5H7L10 19H21" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 9H23L21 16H10" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="22" r="1.5" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="20" cy="22" r="1.5" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 14C22 18.4183 18.4183 22 14 22C9.58172 22 6 18.4183 6 14C6 9.58172 9.58172 6 14 6C17.0 6 19.6 7.8 20.9 10.4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 6V10.4H17.6" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="9" r="4" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M3 22C3 18.134 6.13401 15 10 15C13.866 15 17 18.134 17 22" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="10" r="3" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M19 16C21.7614 16 24 18.2386 24 21" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 4.5C13.46 4.5 11 6.96 11 10C11 10.71 11.13 11.39 11.37 12.02L4.5 18.89L4.5 23.5H9.11L15.98 16.63C16.61 16.87 17.29 17 18 17C21.04 17 23.5 14.54 23.5 11.5C23.5 10.79 23.37 10.11 23.13 9.48L19.5 13.11L15.89 9.5L19.52 5.87C18.89 5.63 18.21 5.5 17.5 5.5" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4L3 10L14 16L25 10L14 4Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 14L14 20L25 14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18L14 24L25 18" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 14H8C8 12.8954 8.89543 12 10 12C11.1046 12 12 12.8954 12 14H14V8C14 6.89543 14.8954 6 16 6H22V12H20C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12H14V22H8C6.89543 22 6 21.1046 6 20V14Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 24V18" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 20L8 24" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 20L20 24" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18C9 18 9 13 14 6C19 13 19 18 19 18H9Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="2" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 20C4.79086 20 3 18.2091 3 16C3 13.7909 4.79086 12 7 12C7 8.13401 10.134 5 14 5C17.866 5 21 8.13401 21 12C23.2091 12 25 13.7909 25 16C25 18.2091 23.2091 20 21 20H7Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 16L13 14L15 16L17 14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 4L6 16H14L13 24L22 12H14L15 4Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 24V14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 14C14 14 10 13 8 10C6 7 8 4 11 4C12.5 4 14 5 14 5C14 5 15.5 4 17 4C20 4 22 7 20 10C18 13 14 14 14 14Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 14C5 14 4 17 6 19C7 20 9 20 9 20" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14C23 14 24 17 22 19C21 20 19 20 19 20" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 14L9 8L13 16L17 10L23 18" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="14" r="2" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="23" cy="18" r="2" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 24V10" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 24V6" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 24V14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 24V4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L4 7V13C4 19.075 8.25 24.675 14 26C19.75 24.675 24 19.075 24 13V7L14 3Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 14L13 17L18 11" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap: Record<string, () => ReactElement> = {
  globe: GlobeIcon,
  cog: CogIcon,
  code: CodeIcon,
  spark: SparkIcon,
  landing: LandingIcon,
  vitrine: VitrineIcon,
  cart: CartIcon,
  refresh: RefreshIcon,
  users: UsersIcon,
  wrench: WrenchIcon,
  layers: LayersIcon,
  puzzle: PuzzleIcon,
  rocket: RocketIcon,
  cloud: CloudIcon,
  zap: ZapIcon,
  brain: BrainIcon,
  motion: MotionIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
};

/* ---- Arrow Icons ---- */

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- Component ---- */

const TOTAL_STEPS = 4;

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setSelectedSubOption("");
    setSelectedExtras([]);
    setStep(2);
  };

  const handleSelectSubOption = (id: string) => {
    setSelectedSubOption(id);
    setSelectedExtras([]);
    setStep(3);
  };

  const handleContinue = () => {
    if (step === 3) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedCategory("");
      setStep(1);
    } else if (step === 3) {
      setSelectedSubOption("");
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 5) {
      setStep(4);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    // TODO: send email payload to contact@ovek.io
    console.log({
      category: selectedCategory,
      subOption: selectedSubOption,
      extras: selectedExtras,
      contact,
    });
    setStep(5);
  };

  /* Recap helpers */
  const getCategoryTitle = () =>
    step1Options.find((o) => o.id === selectedCategory)?.title ?? "";

  const getSubOptionData = () => {
    const opts = step2Options[selectedCategory] || [];
    return opts.find((o) => o.id === selectedSubOption);
  };

  const getExtraData = () =>
    step3Options.filter((o) => selectedExtras.includes(o.id));

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const currentSubOptions = step2Options[selectedCategory] || [];
  const currentStep3Options = step3Options.filter((opt) =>
    opt.visibleFor.includes(selectedCategory)
  );

  /* Step indicator helper — visible on steps 1-4 */
  const showIndicator = step >= 1 && step <= TOTAL_STEPS;

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* Top bar: retour button (steps 2-5) */}
        {step > 1 && (
          <button
            className={styles.topBackButton}
            type="button"
            onClick={handleBack}
          >
            <ArrowLeft />
            <span>Retour</span>
          </button>
        )}

        {/* Animated segmented step indicator */}
        {showIndicator && (
          <div className={styles.stepIndicator}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className={styles.stepSegment}>
                <motion.div
                  className={styles.stepSegmentFill}
                  initial={false}
                  animate={{ scaleX: step > i ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Step content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Step 1 — Category selection (no default, click to advance) */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.grid}>
                {step1Options.map((option) => {
                  const Icon = iconMap[option.icon];
                  return (
                    <button
                      key={option.id}
                      className={styles.card}
                      onClick={() => handleSelectCategory(option.id)}
                      type="button"
                    >
                      <div className={styles.iconWrapper}>
                        <Icon />
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{option.title}</h3>
                        <p className={styles.cardDescription}>
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Sub-option selection (click to advance) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.rowList}>
                {currentSubOptions.map((option) => {
                  const Icon = iconMap[option.icon];
                  return (
                    <button
                      key={option.id}
                      className={styles.rowCard}
                      onClick={() => handleSelectSubOption(option.id)}
                      type="button"
                    >
                      <div className={styles.rowLeft}>
                        <div className={styles.iconWrapper}>
                          <Icon />
                        </div>
                        <div className={styles.rowTextContent}>
                          <h3 className={styles.cardTitle}>{option.title}</h3>
                          <p className={styles.cardDescription}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className={styles.rowPrice}>{option.price}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Complementary options (multi-select) */}
          {step === 3 && (
            <motion.div
              key="step3"
              className={styles.stepContent}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.step3Header}>
                <h2 className={styles.step3Title}>Options complémentaires</h2>
                <p className={styles.step3Subtitle}>
                  Sélectionnez 0 ou plusieurs options
                </p>
              </div>

              <div className={styles.rowList}>
                {currentStep3Options.map((option) => {
                  const Icon = iconMap[option.icon];
                  const isSelected = selectedExtras.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      className={`${styles.rowCard} ${
                        isSelected ? styles.rowCardSelected : ""
                      }`}
                      onClick={() => toggleExtra(option.id)}
                      type="button"
                    >
                      <div className={styles.rowLeft}>
                        <div className={styles.iconWrapper}>
                          <Icon />
                        </div>
                        <div className={styles.rowTextContent}>
                          <h3 className={styles.cardTitle}>{option.title}</h3>
                          <p className={styles.cardDescription}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className={styles.rowRight}>
                        <div className={styles.rowPrice}>{option.price}</div>
                        <div
                          className={`${styles.checkbox} ${
                            isSelected ? styles.checkboxSelected : ""
                          }`}
                        >
                          {isSelected && <CheckIcon />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={styles.buttonRow}>
                <div className={styles.estimatedPrice}>
                  <span className={styles.estimatedPriceLabel}>Estimation</span>
                  <span className={styles.estimatedPriceValue}>
                    {getSubOptionData()?.price ?? ""}
                  </span>
                </div>
                <button
                  className={styles.continueButton}
                  type="button"
                  onClick={handleContinue}
                >
                  <span>Continuer</span>
                  <ArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Contact form with Submit */}
          {step === 4 && (
            <motion.div
              key="step4"
              className={styles.stepContent}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={styles.step3Header}>
                <h2 className={styles.step3Title}>Vos coordonnées</h2>
                <p className={styles.step3Subtitle}>
                  Dites-nous comment vous contacter
                </p>
              </div>

              <div className={styles.formFields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="name">
                    Prénom & Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.fieldInput}
                    placeholder="Jean Dupont"
                    value={contact.name}
                    onChange={handleContactChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.fieldInput}
                    placeholder="jean@exemple.com"
                    value={contact.email}
                    onChange={handleContactChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={styles.fieldInput}
                    placeholder="+33 6 12 34 56 78"
                    value={contact.phone}
                    onChange={handleContactChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="description">
                    Décrivez le projet
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={styles.fieldTextarea}
                    placeholder="Parlez-nous de votre projet, vos objectifs, vos délais..."
                    rows={5}
                    value={contact.description}
                    onChange={handleContactChange}
                  />
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button
                  className={styles.submitButton}
                  type="button"
                  onClick={handleSubmit}
                >
                  <span>Soumettre</span>
                  <ArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5 — Confirmation */}
          {step === 5 && (() => {
            const subOption = getSubOptionData();
            const extras = getExtraData();

            return (
              <motion.div
                key="step5"
                className={styles.stepContent}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={styles.confirmationIcon}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" stroke="#8B5CF6" strokeWidth="2" />
                    <path d="M15 24L21 30L33 18" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className={styles.confirmationHeader}>
                  <h2 className={styles.confirmationTitle}>
                    Merci, {contact.name.split(" ")[0] || "votre demande"} !
                  </h2>
                  <p className={styles.confirmationSubtitle}>
                    Votre demande a bien été envoyée. Nous reviendrons vers vous
                    rapidement.
                  </p>
                </div>

                <div className={styles.recapCard}>
                  <h3 className={styles.recapTitle}>Récapitulatif</h3>
                  <div className={styles.recapRows}>
                    <div className={styles.recapRow}>
                      <span className={styles.recapLabel}>Catégorie</span>
                      <span className={styles.recapValue}>{getCategoryTitle()}</span>
                    </div>
                    <div className={styles.recapRow}>
                      <span className={styles.recapLabel}>Type</span>
                      <span className={styles.recapValue}>{subOption?.title}</span>
                    </div>
                    <div className={styles.recapRow}>
                      <span className={styles.recapLabel}>Fourchette</span>
                      <span className={styles.recapValue}>{subOption?.price}</span>
                    </div>
                    {extras.length > 0 && (
                      <div className={styles.recapRow}>
                        <span className={styles.recapLabel}>Options</span>
                        <span className={styles.recapValue}>
                          {extras.map((e) => e.title).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.buttonRowCenter}>
                  <a
                    href="https://cal.eu/ovek.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.continueButton}
                  >
                    <span>Réserver un appel</span>
                    <ArrowRight />
                  </a>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}
