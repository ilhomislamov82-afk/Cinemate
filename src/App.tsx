import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { TrailerModal } from './components/TrailerModal';
import { ApiStatusModal } from './components/ApiStatusModal';
import { MovieChat } from './components/MovieChat';
import { HomeView } from './views/HomeView';
import { MoviesView } from './views/MoviesView';
import { AnimatedView } from './views/AnimatedView';
import { SearchView } from './views/SearchView';
import { FavoritesView } from './views/FavoritesView';
import { WatchlistView } from './views/WatchlistView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const { selectedMovie, closeMovieDetails } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {currentTab === 'home' && <HomeView />}
        {currentTab === 'movies' && <MoviesView />}
        {currentTab === 'animated' && <AnimatedView />}
        {currentTab === 'search' && <SearchView />}
        {currentTab === 'favorites' && <FavoritesView onNavigate={setCurrentTab} />}
        {currentTab === 'watchlist' && <WatchlistView onNavigate={setCurrentTab} />}
        {currentTab === 'settings' && <SettingsView onOpenApiModal={() => setIsApiModalOpen(true)} />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentTab}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Floating MO-VIE AI Assistant */}
      <MovieChat />

      {/* Global Modals */}
      <OnboardingModal />
      <MovieDetailsModal movie={selectedMovie} onClose={closeMovieDetails} />
      <TrailerModal />
      <ApiStatusModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
