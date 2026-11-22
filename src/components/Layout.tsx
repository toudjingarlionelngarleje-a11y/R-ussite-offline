import React, { useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookMarked,
  BookOpen,
  Bot,
  Calendar,
  Compass,
  Crown,
  Download,
  FileText,
  GraduationCap,
  HardDrive,
  Heart,
  Home,
  Layers,
  LayoutGrid,
  Lock,
  Menu,
  Moon,
  PenTool,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  StickyNote,
  Sun,
  Timer,
  Users,
  Wand2,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { daysUntil } from '../lib/planner';
import { ScreenId } from '../types';
import { PlanModal } from './PlanModal';
import { SyncBadge } from './SyncBadge';

interface NavGroup {
  label: string;
  items: { id: ScreenId; label: string; icon: React.FC<{ className?: string }>; badge?: number }[];
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    state,
    activeProfile,
    isOwner,
    twoFactorMandatory,
    lockTwoFactorSessionNow,
    screen,
    navigate,
    isOnline,
    syncStatus,
    toggleSimulatedOffline,
    updateAccessibility,
    getMistakeQuestionIds,
    setShowPlanModal,
    switchProfile,
    logout,
    toasts,
    dismissToast,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthOrWelcome =
    screen === 'welcome' ||
    screen === 'auth' ||
    screen === 'onboarding-exam' ||
    screen === 'onboarding-goals';

  const isFocusLocked =
    (screen === 'mock-exam' || screen === 'training') &&
    Boolean(state.inProgressSession?.focusLock);

  const mistakeCount = getMistakeQuestionIds().length;
  const pendingCount = state.syncQueue.length;
  const countdown = activeProfile?.examDate ? daysUntil(activeProfile.examDate) : null;

  const navGroups: NavGroup[] = [
    {
      label: 'Coach & Révision',
      items: [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'diagnostic', label: 'Test de niveau IA', icon: Compass },
        { id: 'coach', label: 'Assistant & Vocal', icon: Bot },
        { id: 'library', label: 'Bibliothèque', icon: BookOpen },
        { id: 'annales', label: 'Banque d’annales', icon: FileText },
        { id: 'fiche-viewer', label: 'Fiches synthétiques', icon: BookMarked },
        { id: 'flashcards', label: 'Flashcards (SM-2)', icon: Layers },
      ],
    },
    {
      label: 'Entraînement',
      items: [
        { id: 'training', label: 'Modes d’entraînement', icon: Timer },
        { id: 'mock-exam', label: 'Examen blanc & Officiel', icon: GraduationCap },
        { id: 'mistakes', label: 'Révision erreurs', icon: AlertCircle, badge: mistakeCount },
        { id: 'planner', label: 'Programme perso', icon: Calendar },
        { id: 'stats', label: 'Compétences & Stats', icon: BarChart3 },
      ],
    },
    {
      label: 'Hors ligne & Personnel',
      items: [
        { id: 'downloads', label: 'Téléchargements', icon: Download },
        { id: 'generator', label: 'Générateur de fiches', icon: Wand2 },
        { id: 'favorites', label: 'Favoris', icon: Heart },
        { id: 'notes', label: 'Notes personnelles', icon: StickyNote },
        { id: 'storage', label: 'Stockage appareil', icon: HardDrive },
        { id: 'sync', label: 'Synchronisation', icon: RefreshCw, badge: pendingCount },
      ],
    },
    {
      label: 'Communauté, Studio & Admin',
      items: [
        { id: 'community', label: 'Groupes d’étude', icon: Users },
        { id: 'teacher', label: 'Espace enseignant', icon: PenTool },
        { id: 'admin', label: 'Admin & Qualité', icon: ShieldCheck },
        {
          id: 'security',
          label: 'Pare-feu & Antivirus',
          icon: ShieldCheck,
          badge: state.security?.blockedCount ? state.security.blockedCount : undefined,
        },
        { id: 'privacy', label: 'Confidentialité & Accès', icon: Shield },
      ],
    },
    ...(isOwner
      ? [
          {
            label: '👑 Espace Propriétaire',
            items: [{ id: 'owner-hub' as ScreenId, label: 'Console Propriétaire', icon: Crown }],
          },
        ]
      : []),
  ];

  const handleNav = (id: ScreenId) => {
    navigate(id);
    setMobileMenuOpen(false);
  };

  if (isAuthOrWelcome) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
        <ToastOverlay toasts={toasts} onDismiss={dismissToast} />
        <PlanModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Header Bar */}
      {!isFocusLocked && (
        <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                aria-label="Ouvrir le menu de navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleNav('dashboard')}
                className="flex items-center gap-2 text-left"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-emerald-600 text-white shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
                    Réussite Offline
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeProfile?.name ?? 'Mode invité'}
                  </p>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {countdown !== null && (
                <button
                  type="button"
                  onClick={() => handleNav('planner')}
                  className="hidden items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100 md:inline-flex dark:bg-amber-950/60 dark:text-amber-200 dark:ring-amber-800"
                  title="Jours restants avant l'examen"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>J-{countdown}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleNav('security')}
                className="hidden h-9 items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 md:inline-flex dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300"
                title="Centre de Sécurité : Pare-feu WAF, Antivirus et 36 systèmes actifs"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Bouclier 36/36</span>
              </button>

              <SyncBadge
                status={syncStatus}
                pendingCount={pendingCount}
                onClick={() => handleNav('sync')}
                compact
              />

              <button
                type="button"
                onClick={toggleSimulatedOffline}
                className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold transition ${
                  !isOnline
                    ? 'border-slate-700 bg-slate-800 text-white dark:border-slate-300 dark:bg-slate-200 dark:text-slate-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
                title="Simuler la coupure Internet pour tester le mode hors ligne"
              >
                {isOnline ? <Wifi className="h-3.5 w-3.5 text-emerald-600" /> : <WifiOff className="h-3.5 w-3.5" />}
                <span className="hidden md:inline">
                  {isOnline ? 'Tester hors ligne' : 'Reconnecter'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => updateAccessibility({ darkMode: !state.accessibility.darkMode })}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                aria-label="Basculer mode sombre"
                title="Mode sombre / clair"
              >
                {state.accessibility.darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {twoFactorMandatory && (
                <button
                  type="button"
                  onClick={lockTwoFactorSessionNow}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-300"
                  aria-label="Verrouiller la session 2FA"
                  title="Verrouiller immédiatement mon compte (Double Authentification 2FA)"
                >
                  <Lock className="h-4 w-4" />
                </button>
              )}

              {isOwner ? (
                <button
                  type="button"
                  onClick={() => handleNav('owner-hub')}
                  className="hidden h-9 items-center gap-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 px-3 text-xs font-extrabold text-slate-950 shadow-sm hover:from-amber-300 hover:to-yellow-200 sm:inline-flex"
                  title="Ouvrir la Console Propriétaire (Fondateur)"
                >
                  <Crown className="h-3.5 w-3.5" />
                  <span>Propriétaire</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPlanModal(true)}
                  className="hidden h-9 items-center gap-1 rounded-xl bg-amber-100 px-2.5 text-xs font-bold text-amber-900 hover:bg-amber-200 sm:inline-flex dark:bg-amber-900/50 dark:text-amber-100"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{activeProfile?.plan === 'premium' ? 'Plus' : 'Gratuit'}</span>
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Owner Global Announcement Banner */}
      {state.ownerSettings?.announcementEnabled && state.ownerSettings.announcementText && !isFocusLocked && (
        <div
          className={`no-print px-4 py-2 text-center text-xs font-bold ${
            state.ownerSettings.announcementTone === 'warning'
              ? 'bg-amber-400 text-slate-950'
              : state.ownerSettings.announcementTone === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-700 text-white'
          }`}
        >
          📢 Annonce officielle : {state.ownerSettings.announcementText}
        </div>
      )}

      {/* Maintenance Notice Banner */}
      {state.ownerSettings?.maintenanceMode && !isFocusLocked && (
        <div className="no-print bg-red-600 px-4 py-1.5 text-center text-xs font-bold text-white">
          ⚠️ Mode maintenance activé par le Propriétaire — tes contenus hors ligne restent lisibles.
        </div>
      )}

      {/* Offline Banner when offline */}
      {!isOnline && !isFocusLocked && (
        <div className="no-print bg-slate-900 px-4 py-2 text-center text-xs font-medium text-slate-100 dark:bg-slate-200 dark:text-slate-900">
          <span className="inline-flex items-center gap-1.5">
            <WifiOff className="h-3.5 w-3.5" />
            Mode hors ligne actif : tes cours, fiches, flashcards, examens blancs et notes restent 100 % accessibles. La synchronisation reprendra automatiquement au retour du réseau.
          </span>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop Sidebar */}
        {!isFocusLocked && (
          <aside className="no-print hidden w-64 shrink-0 border-r border-slate-200 bg-white/70 px-3 py-5 lg:block dark:border-slate-800 dark:bg-slate-900/40">
            <nav aria-label="Navigation principale" className="space-y-5">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const active =
                        screen === item.id ||
                        (item.id === 'library' && (screen === 'subject-detail' || screen === 'chapters' || screen === 'course-reader'));
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleNav(item.id)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                              active
                                ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-200'
                                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-400'}`} />
                              <span className="truncate">{item.label}</span>
                            </span>
                            {item.badge !== undefined && item.badge > 0 && (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Family / Shared Device Profile Switcher */}
            {state.profiles.length > 0 && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>Appareil partagé ({state.profiles.length})</span>
                </div>
                <select
                  aria-label="Changer de profil utilisateur"
                  value={activeProfile?.id ?? ''}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      handleNav('auth');
                    } else if (e.target.value === '__logout__') {
                      logout();
                    } else {
                      switchProfile(e.target.value);
                    }
                  }}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  {state.profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                  <option value="__new__">+ Ajouter un profil</option>
                  <option value="__logout__">Se déconnecter</option>
                </select>
              </div>
            )}
          </aside>
        )}

        {/* Main Content Area */}
        <main className={`min-w-0 flex-1 px-3 py-5 sm:px-6 ${!isFocusLocked ? 'pb-24 lg:pb-10' : 'pb-8'}`}>
          {children}
        </main>
      </div>

      {/* Mobile One-Hand Bottom Navigation */}
      {!isFocusLocked && (
        <nav
          aria-label="Navigation rapide mobile"
          className="no-print fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95"
        >
          <div className="grid grid-cols-5">
            {[
              { id: 'dashboard' as ScreenId, label: 'Accueil', icon: Home },
              { id: 'library' as ScreenId, label: 'Cours', icon: BookOpen },
              { id: 'training' as ScreenId, label: 'Quiz', icon: Timer },
              { id: 'planner' as ScreenId, label: 'Planning', icon: Calendar },
            ].map((item) => {
              const active = screen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
                    active
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400"
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Plus</span>
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Full Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Menu complet">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-4 shadow-2xl dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Réussite Offline</p>
                <p className="text-xs text-slate-500">{activeProfile?.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-5">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNav(item.id)}
                          className={`flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium ${
                            screen === item.id
                              ? 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="mt-6 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              Changer de profil / Déconnexion
            </button>
          </div>
        </div>
      )}

      <ToastOverlay toasts={toasts} onDismiss={dismissToast} />
      <PlanModal />
    </div>
  );
};

const ToastOverlay: React.FC<{
  toasts: { id: string; text: string; tone: 'info' | 'success' | 'warning' | 'error' }[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;
  return (
    <div
      className="no-print fixed bottom-20 right-4 z-50 flex max-w-sm flex-col gap-2 lg:bottom-5"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const toneCls =
          t.tone === 'success'
            ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
            : t.tone === 'warning'
            ? 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100'
            : t.tone === 'error'
            ? 'border-red-300 bg-red-50 text-red-950 dark:border-red-800 dark:bg-red-950 dark:text-red-100'
            : 'border-blue-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';
        return (
          <div
            key={t.id}
            className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-xs font-medium shadow-lg ${toneCls}`}
          >
            <span>{t.text}</span>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              className="opacity-70 hover:opacity-100"
              aria-label="Fermer la notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
