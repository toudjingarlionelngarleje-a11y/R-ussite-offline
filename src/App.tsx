import React from 'react';
import { Layout } from './components/Layout';
import { AppProvider, useApp } from './context/AppContext';
import { AnnalesScreen } from './screens/AnnalesScreen';
import { AuthScreen } from './screens/AuthScreen';
import { CoachScreen } from './screens/CoachScreen';
import { CommunityAdminScreen } from './screens/CommunityAdminScreen';
import { CorrectionScreen } from './screens/CorrectionScreen';
import { CourseReaderScreen } from './screens/CourseReaderScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { DiagnosticScreen } from './screens/DiagnosticScreen';
import { DownloadsScreen } from './screens/DownloadsScreen';
import { FavoritesNotesScreen } from './screens/FavoritesNotesScreen';
import { FicheViewerScreen } from './screens/FicheViewerScreen';
import { FlashcardsScreen } from './screens/FlashcardsScreen';
import { GeneratorScreen } from './screens/GeneratorScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { MistakesScreen } from './screens/MistakesScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { PlannerScreen } from './screens/PlannerScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { PrivacySettingsScreen } from './screens/PrivacySettingsScreen';
import { StatsScreen } from './screens/StatsScreen';
import { StorageSyncScreen } from './screens/StorageSyncScreen';
import { TeacherScreen } from './screens/TeacherScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';

const ScreenRouter: React.FC = () => {
  const { screen, hydrated } = useApp();

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-semibold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Chargement de ton espace hors ligne...
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'onboarding-exam':
      case 'onboarding-goals':
        return <OnboardingScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'diagnostic':
        return <DiagnosticScreen />;
      case 'coach':
        return <CoachScreen />;
      case 'generator':
        return <GeneratorScreen />;
      case 'library':
      case 'subject-detail':
      case 'chapters':
        return <LibraryScreen />;
      case 'annales':
        return <AnnalesScreen />;
      case 'downloads':
        return <DownloadsScreen />;
      case 'course-reader':
        return <CourseReaderScreen />;
      case 'fiche-viewer':
        return <FicheViewerScreen />;
      case 'flashcards':
        return <FlashcardsScreen />;
      case 'training':
      case 'mock-exam':
        return <PracticeScreen />;
      case 'correction':
        return <CorrectionScreen />;
      case 'mistakes':
        return <MistakesScreen />;
      case 'planner':
        return <PlannerScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'favorites':
      case 'notes':
        return <FavoritesNotesScreen />;
      case 'storage':
      case 'sync':
        return <StorageSyncScreen />;
      case 'community':
      case 'admin':
        return <CommunityAdminScreen />;
      case 'teacher':
        return <TeacherScreen />;
      case 'privacy':
        return <PrivacySettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return <Layout>{renderScreen()}</Layout>;
};

export const App: React.FC = () => (
  <AppProvider>
    <ScreenRouter />
  </AppProvider>
);

export default App;
