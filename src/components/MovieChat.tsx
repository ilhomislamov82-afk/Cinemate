import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Film,
  Minimize2,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage, MovieItem } from '../types';
import { movieService } from '../services/movieService';
import { MovieCard } from './MovieCard';

export const MovieChat: React.FC = () => {
  const {
    isAssistantOpen,
    closeAssistant,
    toggleAssistant,
    assistantInitialPrompt,
    preferences,
    selectedMovie,
    t,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'assistant',
      content: t.assistant.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What should I watch tonight?',
    'Recommend an adventure movie',
    'Show me highly rated animated movies',
    'Recommend something funny',
    'What are some good fantasy movies?',
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAssistantOpen) {
      scrollToBottom();
    }
  }, [messages, isAssistantOpen]);

  // Handle triggered initial prompt from elsewhere in app
  useEffect(() => {
    if (assistantInitialPrompt && isAssistantOpen) {
      handleSendMessage(assistantInitialPrompt);
    }
  }, [assistantInitialPrompt, isAssistantOpen]);

  // Handle sending message
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Prepare history and catalog context
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
          preferences: {
            nickname: preferences.username,
            language: preferences.language,
            contentPreference: preferences.contentPreference,
            favoriteGenres: preferences.favoriteGenres,
            ratings: preferences.ratings,
            favorites: preferences.favorites,
            watchlist: preferences.watchlist.map((w) => w.id),
          },
          currentMovieId: selectedMovie?.id,
          catalogSummary: movieService.getCatalogSummary(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        let recommendedIds: string[] = data.recommendedMovieIds || [];

        // If no movie IDs were provided by model, but user asked for recommendations,
        // use local recommendation heuristic to match items from catalog
        if (recommendedIds.length === 0 && isRecommendationIntent(trimmed)) {
          const localRecs = getFallbackMovieRecommendations(trimmed);
          recommendedIds = localRecs.map((m) => m.id);
        }

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.replyText || "Here are some recommendations I think you'll love!",
          recommendedMovieIds: recommendedIds,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback response if endpoint fails
        handleLocalFallback(trimmed);
      }
    } catch {
      handleLocalFallback(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const isRecommendationIntent = (query: string): boolean => {
    const q = query.toLowerCase();
    return (
      q.includes('recommend') ||
      q.includes('suggest') ||
      q.includes('what should i watch') ||
      q.includes('similar') ||
      q.includes('movie') ||
      q.includes('film') ||
      q.includes('tavsiya') ||
      q.includes('посоветуй')
    );
  };

  const getFallbackMovieRecommendations = (query: string): MovieItem[] => {
    const q = query.toLowerCase();

    // Check specific genre request
    for (const genre of movieService.getGenres()) {
      if (q.includes(genre.toLowerCase())) {
        const typeFilter = q.includes('animated') || q.includes('animation') ? 'animated' : undefined;
        return movieService.getByGenre(genre, typeFilter, 3);
      }
    }

    if (q.includes('animated') || q.includes('animation') || q.includes('multfilm')) {
      return movieService.getTrending('animated', 3);
    }

    // Default to personalized recommendation based on user state
    return movieService.getPersonalizedRecommendations(preferences, undefined, 3);
  };

  const handleLocalFallback = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    const isOffTopic =
      !q.includes('movie') &&
      !q.includes('film') &&
      !q.includes('watch') &&
      !q.includes('director') &&
      !q.includes('actor') &&
      !q.includes('genre') &&
      !q.includes('animation') &&
      !q.includes('anime') &&
      !q.includes('cinema') &&
      !q.includes('tavsiya') &&
      !q.includes('kino') &&
      !q.includes('фильм');

    if (isOffTopic) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: t.assistant.offTopicNotice,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    const recs = getFallbackMovieRecommendations(userQuery);
    const movieIds = recs.map((m) => m.id);

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: `Based on your CineMate profile and interest in ${
          preferences.favoriteGenres[0] || 'cinema'
        }, here are handpicked selections tailored for you:`,
        recommendedMovieIds: movieIds,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: t.assistant.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating MO-VIE Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isAssistantOpen && (
          <button
            onClick={toggleAssistant}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-indigo-600 text-black font-extrabold shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open MO-VIE AI Assistant"
          >
            {/* Pulsing ring indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
            </span>

            <div className="w-8 h-8 rounded-xl bg-black text-amber-400 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-black tracking-wider uppercase font-['Outfit']">
                MO-VIE
              </p>
              <p className="text-[10px] font-semibold text-black/75">
                AI Assistant
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Modern Slide-in / Drawer Chat Panel */}
      {isAssistantOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] z-50 bg-[#0d1019] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[#121623] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1px] shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#0d1019] rounded-2xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white font-['Outfit']">
                    MO-VIE
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Cinema & Animation Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title={t.assistant.clearChat}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={closeAssistant}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Close assistant"
              >
                <Minimize2 className="w-4 h-4 sm:block hidden" />
                <X className="w-5 h-5 sm:hidden" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const recommendedMovies = msg.recommendedMovieIds
                ? movieService.getByIds(msg.recommendedMovieIds)
                : [];

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-amber-500 text-black font-semibold rounded-br-none'
                        : 'bg-[#151926] text-slate-200 border border-white/5 rounded-bl-none font-normal'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Interactive Movie Cards inside Chat */}
                    {recommendedMovies.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1">
                          <Film className="w-3.5 h-3.5" />
                          <span>Recommended Discoveries</span>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {recommendedMovies.map((movie) => (
                            <div key={movie.id} className="w-full">
                              <MovieCard movie={movie} size="compact" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-[#151926] p-3 rounded-2xl border border-white/5 w-fit">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>{t.assistant.thinking}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-[#101420]/80 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex-shrink-0">
              {t.assistant.suggestionsTitle}
            </span>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 text-xs whitespace-nowrap border border-white/5 transition-colors font-medium flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-[#121623]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.assistant.inputPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl bg-[#0b0e14] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              {t.assistant.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
