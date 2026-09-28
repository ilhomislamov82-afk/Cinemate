import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    movies: string;
    animated: string;
    search: string;
    favorites: string;
    watchlist: string;
    settings: string;
  };
  categories: {
    moviesOnly: string;
    animatedOnly: string;
    moviesBadge: string;
    animatedBadge: string;
    moviesDesc: string;
    animatedDesc: string;
  };
  home: {
    heroWatchlist: string;
    heroFavorite: string;
    heroInWatchlist: string;
    heroInFavorites: string;
    heroTrailer: string;
    heroDetails: string;
    trendingMovies: string;
    trendingAnimated: string;
    topRatedMovies: string;
    topRatedAnimated: string;
    recentlyReleasedMovies: string;
    recentlyReleasedAnimated: string;
    recommendedForYou: string;
    becauseYouLike: string;
    becauseYouLiked: string;
    moreLikeThis: string;
    trendingBadge: string;
    tenItemsCount: string;
  };
  card: {
    viewDetails: string;
    addToFavorites: string;
    removeFromFavorites: string;
    addToWatchlist: string;
    removeFromWatchlist: string;
    watched: string;
    communityRating: string;
  };
  details: {
    runtime: string;
    releaseYear: string;
    rating: string;
    communityRating: string;
    yourRating: string;
    ratePrompt: string;
    ratedSuccess: string;
    director: string;
    cast: string;
    synopsis: string;
    officialTrailer: string;
    noTrailer: string;
    close: string;
    similars: string;
    notice: string;
  };
  onboarding: {
    step: string;
    of: string;
    step1Title: string;
    step1Subtitle: string;
    step1Note: string;
    usernamePlaceholder: string;
    nicknameExamples: string;
    step2Title: string;
    step2Subtitle: string;
    moviesOption: string;
    moviesOptionDesc: string;
    animatedOption: string;
    animatedOptionDesc: string;
    bothOption: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    skip: string;
    next: string;
    back: string;
    finish: string;
    usernameRequired: string;
  };
  search: {
    title: string;
    placeholder: string;
    allTypes: string;
    moviesOnly: string;
    animatedOnly: string;
    allGenres: string;
    allYears: string;
    minRating: string;
    sortBy: string;
    sortPopular: string;
    sortRating: string;
    sortNewest: string;
    sortTitle: string;
    resultsFound: string;
    noResults: string;
    noResultsTip: string;
    clearFilters: string;
  };
  favorites: {
    title: string;
    subtitle: string;
    emptyMovies: string;
    emptyAnimated: string;
    browseMovies: string;
    browseAnimated: string;
    clearAll: string;
  };
  watchlist: {
    title: string;
    subtitle: string;
    tabAll: string;
    tabUnwatched: string;
    tabWatched: string;
    markWatched: string;
    markUnwatched: string;
    remove: string;
    emptyWatchlist: string;
    browseToWatch: string;
  };
  settings: {
    title: string;
    subtitle: string;
    profileSection: string;
    nicknameLabel: string;
    nicknameNotice: string;
    saveNickname: string;
    savedSuccess: string;
    languageSection: string;
    contentSection: string;
    genresSection: string;
    dataSection: string;
    clearFavoritesConfirm: string;
    clearWatchlistConfirm: string;
    resetAllConfirm: string;
    apiStatusTitle: string;
    apiStatusDesc: string;
    demoNotice: string;
  };
  assistant: {
    title: string;
    greeting: string;
    inputPlaceholder: string;
    send: string;
    thinking: string;
    suggestionsTitle: string;
    disclaimer: string;
    offTopicNotice: string;
    clearChat: string;
  };
  demoBanner: {
    badge: string;
    info: string;
    viewApiStatus: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'CineMate',
    tagline: 'Your personalized cinema & animation universe',
    nav: {
      home: 'Home',
      movies: 'Movies',
      animated: 'Animated',
      search: 'Search',
      favorites: 'Favorites',
      watchlist: 'Watchlist',
      settings: 'Settings',
    },
    categories: {
      moviesOnly: 'Movies',
      animatedOnly: 'Animated Movies',
      moviesBadge: 'Live Action Cinema',
      animatedBadge: 'Animation Studio',
      moviesDesc: 'Feature films, blockbusters, award-winning dramas and thrillers',
      animatedDesc: 'Artistic masterpieces, anime, 3D marvels and animated epics',
    },
    home: {
      heroWatchlist: 'Add to Watchlist',
      heroFavorite: 'Add to Favorites',
      heroInWatchlist: 'In Watchlist',
      heroInFavorites: 'In Favorites',
      heroTrailer: 'Official Trailer',
      heroDetails: 'View Details',
      trendingMovies: '🔥 Trending This Month',
      trendingAnimated: '🔥 Trending Animated This Month',
      topRatedMovies: '🏆 Top Rated This Year',
      topRatedAnimated: '🏆 Top Rated Animated This Year',
      recentlyReleasedMovies: '🆕 Recently Released',
      recentlyReleasedAnimated: '🆕 Recently Released Animated',
      recommendedForYou: '❤️ Recommended For You',
      becauseYouLike: 'Because You Like',
      becauseYouLiked: 'Because You Liked',
      moreLikeThis: 'More Like This',
      trendingBadge: 'Top 10',
      tenItemsCount: '10 Handpicked Titles',
    },
    card: {
      viewDetails: 'View Details',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      addToWatchlist: 'Add to Watchlist',
      removeFromWatchlist: 'Remove from Watchlist',
      watched: 'Watched',
      communityRating: 'Rating',
    },
    details: {
      runtime: 'Runtime',
      releaseYear: 'Year',
      rating: 'Rating',
      communityRating: 'Community Rating',
      yourRating: 'Your Personal Rating',
      ratePrompt: 'Rate from 1 to 10',
      ratedSuccess: 'Rated! MO-VIE will use this to improve recommendations.',
      director: 'Director',
      cast: 'Main Cast',
      synopsis: 'Description',
      officialTrailer: 'Official Trailer',
      noTrailer: 'Official trailer preview is currently unavailable.',
      close: 'Close',
      similars: 'More Like This',
      notice: 'Legitimate metadata & official trailer sources only.',
    },
    onboarding: {
      step: 'Step',
      of: 'of',
      step1Title: 'Choose your username',
      step1Subtitle: 'Create a unique identity for your CineMate journey.',
      step1Note: 'Use a nickname instead of your real name.',
      usernamePlaceholder: 'Enter a fun nickname...',
      nicknameExamples: 'Popular examples:',
      step2Title: 'What do you want to discover?',
      step2Subtitle: 'Select one or both categories to shape your feed.',
      moviesOption: '🎬 Movies',
      moviesOptionDesc: 'Live-action feature films, cinematic epics, indies & blockbusters',
      animatedOption: '🎨 Animated Movies',
      animatedOptionDesc: 'Feature-length animated stories, anime, CGI & 2D classics',
      bothOption: '✨ Both (Recommended)',
      step3Title: 'What genres do you enjoy?',
      step3Subtitle: 'Select the vibes and styles you love watching most.',
      step4Title: 'Choose your interface language',
      step4Subtitle: 'CineMate adapts seamlessly to your preferred language.',
      skip: 'Skip for now',
      next: 'Continue',
      back: 'Back',
      finish: 'Explore CineMate',
      usernameRequired: 'Please choose a nickname to continue.',
    },
    search: {
      title: 'Explore Library',
      placeholder: 'Search by title, director, actor, genre or year...',
      allTypes: 'All Categories',
      moviesOnly: '🎬 Movies Only',
      animatedOnly: '🎨 Animated Only',
      allGenres: 'All Genres',
      allYears: 'All Years',
      minRating: 'Min Rating',
      sortBy: 'Sort By',
      sortPopular: 'Popularity',
      sortRating: 'Highest Rating',
      sortNewest: 'Release Date',
      sortTitle: 'Title (A-Z)',
      resultsFound: 'results found',
      noResults: 'No movies found for your search',
      noResultsTip: 'Try adjusting your search terms or relaxing the filters.',
      clearFilters: 'Reset Filters',
    },
    favorites: {
      title: 'My Favorites',
      subtitle: 'Your personal collection of cherished cinematic works',
      emptyMovies: 'No favorite movies added yet.',
      emptyAnimated: 'No favorite animated movies added yet.',
      browseMovies: 'Discover Movies',
      browseAnimated: 'Discover Animated',
      clearAll: 'Clear All Favorites',
    },
    watchlist: {
      title: 'My Watchlist',
      subtitle: 'Keep track of films you plan to watch and your viewing log',
      tabAll: 'All Items',
      tabUnwatched: 'To Watch',
      tabWatched: 'Already Watched',
      markWatched: 'Mark as Watched',
      markUnwatched: 'Mark as To Watch',
      remove: 'Remove',
      emptyWatchlist: 'Your watchlist is empty.',
      browseToWatch: 'Explore and add movies to your list',
    },
    settings: {
      title: 'Settings & Preferences',
      subtitle: 'Manage your profile nickname, language, recommendations, and local data',
      profileSection: 'Profile Nickname',
      nicknameLabel: 'Your Nickname',
      nicknameNotice: 'For your privacy, only use a nickname instead of your real name.',
      saveNickname: 'Update Nickname',
      savedSuccess: 'Settings saved successfully!',
      languageSection: 'Interface Language',
      contentSection: 'Content Preferences',
      genresSection: 'Favorite Genres',
      dataSection: 'Data & Privacy',
      clearFavoritesConfirm: 'Clear all favorites? This cannot be undone.',
      clearWatchlistConfirm: 'Clear all watchlist items? This cannot be undone.',
      resetAllConfirm: 'Reset all preferences and local history to defaults?',
      apiStatusTitle: 'Movie Data Architecture',
      apiStatusDesc: 'CineMate uses a dedicated service layer designed to connect to legitimate movie metadata APIs like TMDB or IMDb.',
      demoNotice: 'Demo Mode Active: Preloaded with curated legitimate metadata and official trailer embeds.',
    },
    assistant: {
      title: 'MO-VIE Assistant',
      greeting: 'Hi! I’m MO-VIE, your movie and animation assistant. I can help you discover movies, animated films and something that matches your taste.',
      inputPlaceholder: 'Ask about movies, directors, genres or recommendations...',
      send: 'Send',
      thinking: 'MO-VIE is thinking...',
      suggestionsTitle: 'Try asking:',
      disclaimer: 'Personalized using your ratings and tastes. Movies and animated films only.',
      offTopicNotice: 'I’m MO-VIE, so I’m mainly here to help with movies and animated films. Ask me about a movie, genre, actor, or what you should watch!',
      clearChat: 'Clear Chat',
    },
    demoBanner: {
      badge: 'DEMO MODE',
      info: 'Running on CineMate Curated Catalog. Ready for external metadata API.',
      viewApiStatus: 'API Info',
    },
  },
  uz: {
    appName: 'CineMate',
    tagline: 'Sizning shaxsiy kino va animatsiya olamingiz',
    nav: {
      home: 'Bosh sahifa',
      movies: 'Filmlar',
      animated: 'Multfilmlar',
      search: 'Qidiruv',
      favorites: 'Sevimlilar',
      watchlist: 'Ko‘rish ro‘yxati',
      settings: 'Sozlamalar',
    },
    categories: {
      moviesOnly: 'Filmlar',
      animatedOnly: 'Multfilmlar',
      moviesBadge: 'Badiiy Kinolar',
      animatedBadge: 'Animatsiya Studiyasi',
      moviesDesc: 'Katta ekran durdonalari, blokbasterlar va dramalar',
      animatedDesc: 'Badiiy durdonalar, anime va zamonaviy 3D animatsiyalar',
    },
    home: {
      heroWatchlist: 'Ro‘yxatga qo‘shish',
      heroFavorite: 'Sevimlilarga qo‘shish',
      heroInWatchlist: 'Ro‘yxatda mavjud',
      heroInFavorites: 'Sevimlilarda',
      heroTrailer: 'Rasmiy Treyer',
      heroDetails: 'Tafsilotlar',
      trendingMovies: '🔥 Ushbu oy trendlari',
      trendingAnimated: '🔥 Oydagi eng mashhur multfilmlar',
      topRatedMovies: '🏆 Yilning eng yuqori baholanganlari',
      topRatedAnimated: '🏆 Eng yaxshi baholangan multfilmlar',
      recentlyReleasedMovies: '🆕 Yangi chiqarilgan filmlar',
      recentlyReleasedAnimated: '🆕 Yangi multfilmlar',
      recommendedForYou: '❤️ Siz uchun tavsiyalar',
      becauseYouLike: 'Siz yoqtirganingiz uchun',
      becauseYouLiked: 'Sizga yoqqan film asosida',
      moreLikeThis: 'Shunga o‘xshashlar',
      trendingBadge: 'Top 10',
      tenItemsCount: '10 ta saralangan film',
    },
    card: {
      viewDetails: 'Tafsilotlar',
      addToFavorites: 'Sevimlilarga',
      removeFromFavorites: 'Sevimlilardan olish',
      addToWatchlist: 'Ro‘yxatga',
      removeFromWatchlist: 'Ro‘yxatdan olish',
      watched: 'Ko‘rilgan',
      communityRating: 'Reyting',
    },
    details: {
      runtime: 'Davomiyligi',
      releaseYear: 'Yili',
      rating: 'Reyting',
      communityRating: 'Umumiy reyting',
      yourRating: 'Sizning shaxsiy bahoingiz',
      ratePrompt: '1 dan 10 gacha baholang',
      ratedSuccess: 'Baholandi! MO-VIE bundan tavsiyalar uchun foydalanadi.',
      director: 'Rejissyor',
      cast: 'Bosh rollarda',
      synopsis: 'Tavsif',
      officialTrailer: 'Rasmiy Treyer',
      noTrailer: 'Rasmiy treyler hozircha mavjud emas.',
      close: 'Yopish',
      similars: 'O‘xshash filmlar',
      notice: 'Faqat qonuniy metama’lumotlar va rasmiy treylerlar.',
    },
    onboarding: {
      step: 'Bosqich',
      of: 'dan',
      step1Title: 'Taxallusingizni tanlang',
      step1Subtitle: 'CineMate tajribangiz uchun qulay nom tanlang.',
      step1Note: 'Haqiqiy ismingiz o‘rniga taxallus (nickname) ishlating.',
      usernamePlaceholder: 'Ajoyib taxallus kiriting...',
      nicknameExamples: 'Tavsiya etilgan namunalar:',
      step2Title: 'Nimani kashf qilishni xohlaysiz?',
      step2Subtitle: 'Lentangizni shakllantirish uchun birini yoki ikkalasini tanlang.',
      moviesOption: '🎬 Filmlar',
      moviesOptionDesc: 'Badiiy filmlar, kino asarlari va blokbasterlar',
      animatedOption: '🎨 Multfilmlar',
      animatedOptionDesc: 'To‘liq metrajli animatsiyalar, anime va klassikalar',
      bothOption: '✨ Ikkalasi ham (Tavsiya etiladi)',
      step3Title: 'Qaysi janrlarni yoqtirasiz?',
      step3Subtitle: 'O‘zingizga yoqadigan yo‘nalishlarni belgilang.',
      step4Title: 'Interfeys tilini tanlang',
      step4Subtitle: 'CineMate tanlangan tilga to‘liq moslashadi.',
      skip: 'Hozircha o‘tkazib yuborish',
      next: 'Davom etish',
      back: 'Orqaga',
      finish: 'CineMate-ni boshlash',
      usernameRequired: 'Davom etish uchun taxallus kiriting.',
    },
    search: {
      title: 'Kutubxonani qidirish',
      placeholder: 'Nomi, aktyor, rejissyor, janr yoki yil bo‘yicha qidiring...',
      allTypes: 'Barcha toifalar',
      moviesOnly: '🎬 Faqat filmlar',
      animatedOnly: '🎨 Faqat multfilmlar',
      allGenres: 'Barcha janrlar',
      allYears: 'Barcha yillar',
      minRating: 'Minimal reyting',
      sortBy: 'Saralash',
      sortPopular: 'Ommaboplik',
      sortRating: 'Yuqori reyting',
      sortNewest: 'Chiqarilgan sana',
      sortTitle: 'Nomi (A-Z)',
      resultsFound: 'ta natija topildi',
      noResults: 'Qidiruvingiz bo‘yicha filmlar topilmadi',
      noResultsTip: 'Qidiruv so‘zini o‘zgartirib yoki filtrlarni kamaytirib ko‘ring.',
      clearFilters: 'Filtrlarni tozalash',
    },
    favorites: {
      title: 'Mening sevimlilarim',
      subtitle: 'Siz saqlagan eng sara kino asarlari to‘plami',
      emptyMovies: 'Sevimlilarda filmlar hozircha yo‘q.',
      emptyAnimated: 'Sevimlilarda multfilmlar hozircha yo‘q.',
      browseMovies: 'Filmlarni ko‘rish',
      browseAnimated: 'Multfilmlarni ko‘rish',
      clearAll: 'Barchasini tozalash',
    },
    watchlist: {
      title: 'Mening ko‘rish ro‘yxatim',
      subtitle: 'Keyinroq ko‘rmoqchi bo‘lgan filmlaringiz ro‘yxati',
      tabAll: 'Barchasi',
      tabUnwatched: 'Ko‘riladiganlar',
      tabWatched: 'Ko‘rib bo‘linganlar',
      markWatched: 'Ko‘rildi deb belgilash',
      markUnwatched: 'Ko‘rilmagan qilish',
      remove: 'O‘chirish',
      emptyWatchlist: 'Ko‘rish ro‘yxatingiz bo‘sh.',
      browseToWatch: 'Filmlarni kashf qiling va ro‘yxatingizga qo‘shing',
    },
    settings: {
      title: 'Sozlamalar va afzalliklar',
      subtitle: 'Taxallus, til, tavsiyalar va ma’lumotlarni boshqaring',
      profileSection: 'Profil taxallusi',
      nicknameLabel: 'Sizning taxallusingiz',
      nicknameNotice: 'Maxfiyligingiz uchun haqiqiy ism o‘rniga taxallus ishlating.',
      saveNickname: 'Taxallusni yangilash',
      savedSuccess: 'Sozlamalar muvaffaqiyatli saqlandi!',
      languageSection: 'Interfeys tili',
      contentSection: 'Kontent turi afzalligi',
      genresSection: 'Sevimli janrlar',
      dataSection: 'Ma’lumotlar va maxfiylik',
      clearFavoritesConfirm: 'Sevimlilar ro‘yxatini tozalashni tasdiqlaysizmi?',
      clearWatchlistConfirm: 'Ko‘rish ro‘yxatini tozalashni tasdiqlaysizmi?',
      resetAllConfirm: 'Barcha sozlamalar va ma’lumotlarni dastlabki holatga qaytarasizmi?',
      apiStatusTitle: 'Kino ma’lumotlar arxitekturasi',
      apiStatusDesc: 'CineMate TMDB kabi qonuniy metama’lumotlar API’lariga ulanish uchun ajratilgan service qatlamidan foydalanadi.',
      demoNotice: 'Demo rejim faol: Saralangan qonuniy ma’lumotlar va rasmiy treylerlar yuklangan.',
    },
    assistant: {
      title: 'MO-VIE Yordamchisi',
      greeting: 'Salom! Men MO-VIE — sizning kino va animatsiya bo‘yicha yordamchingizman. Sizga didingizga mos filmlar va multfilmlarni topishda yordam beraman.',
      inputPlaceholder: 'Filmlar, aktyorlar, janrlar yoki tavsiyalar haqida so‘rang...',
      send: 'Yuborish',
      thinking: 'MO-VIE o‘ylamoqda...',
      suggestionsTitle: 'Bularni so‘rab ko‘ring:',
      disclaimer: 'Baholaringiz va didingizga moslashtirilgan. Faqat filmlar va multfilmlar.',
      offTopicNotice: 'Men MO-VIE bo‘lib, faqat kino va animatsiya bo‘yicha yordam bera olaman. Menga film, janr yoki nima ko‘rish kerakligi haqida savol bering!',
      clearChat: 'Chatni tozalash',
    },
    demoBanner: {
      badge: 'DEMO REJIMI',
      info: 'CineMate saralangan katalogida ishlamoqda. Tashqi API ulashga tayyor.',
      viewApiStatus: 'API ma’lumoti',
    },
  },
  ru: {
    appName: 'CineMate',
    tagline: 'Ваша персональная вселенная кино и анимации',
    nav: {
      home: 'Главная',
      movies: 'Фильмы',
      animated: 'Мультфильмы',
      search: 'Поиск',
      favorites: 'Избранное',
      watchlist: 'Буду смотреть',
      settings: 'Настройки',
    },
    categories: {
      moviesOnly: 'Фильмы',
      animatedOnly: 'Мультфильмы',
      moviesBadge: 'Художественное кино',
      animatedBadge: 'Анимационная студия',
      moviesDesc: 'Полнометражные картины, блокбастеры, драмы и захватывающие триллеры',
      animatedDesc: 'Шедевры анимации, аниме, 3D картины и анимационные саги',
    },
    home: {
      heroWatchlist: 'В список просмотра',
      heroFavorite: 'В избранное',
      heroInWatchlist: 'В списке',
      heroInFavorites: 'В избранном',
      heroTrailer: 'Официальный трейлер',
      heroDetails: 'Подробнее',
      trendingMovies: '🔥 В тренде этого месяца',
      trendingAnimated: '🔥 Популярные мультфильмы месяца',
      topRatedMovies: '🏆 Самый высокий рейтинг года',
      topRatedAnimated: '🏆 Лучшие мультфильмы года',
      recentlyReleasedMovies: '🆕 Недавние новинки',
      recentlyReleasedAnimated: '🆕 Свежие мультфильмы',
      recommendedForYou: '❤️ Рекомендовано для вас',
      becauseYouLike: 'Потому что вы любите',
      becauseYouLiked: 'На основе просмотренного',
      moreLikeThis: 'Похожие произведения',
      trendingBadge: 'Топ 10',
      tenItemsCount: '10 избранных картин',
    },
    card: {
      viewDetails: 'Подробнее',
      addToFavorites: 'В избранное',
      removeFromFavorites: 'Удалить из избранного',
      addToWatchlist: 'Буду смотреть',
      removeFromWatchlist: 'Удалить из списка',
      watched: 'Просмотрено',
      communityRating: 'Рейтинг',
    },
    details: {
      runtime: 'Длительность',
      releaseYear: 'Год',
      rating: 'Рейтинг',
      communityRating: 'Общий рейтинг',
      yourRating: 'Ваша личная оценка',
      ratePrompt: 'Оцените от 1 до 10',
      ratedSuccess: 'Оценка сохранена! MO-VIE учтет её в рекомендациях.',
      director: 'Режиссёр',
      cast: 'В главных ролях',
      synopsis: 'Описание',
      officialTrailer: 'Официальный трейлер',
      noTrailer: 'Официальный предпросмотр трейлера временно недоступен.',
      close: 'Закрыть',
      similars: 'Похожие фильмы',
      notice: 'Только легальные метаданные и официальные трейлеры.',
    },
    onboarding: {
      step: 'Шаг',
      of: 'из',
      step1Title: 'Выберите ваш псевдоним',
      step1Subtitle: 'Придумайте имя для комфортного использования CineMate.',
      step1Note: 'Используйте никнейм вместо настоящего имени.',
      usernamePlaceholder: 'Введите крутой никнейм...',
      nicknameExamples: 'Популярные варианты:',
      step2Title: 'Что вы хотите открывать для себя?',
      step2Subtitle: 'Выберите категории для персонализации вашей ленты.',
      moviesOption: '🎬 Фильмы',
      moviesOptionDesc: 'Художественное кино, эпические саги, инди и блокбастеры',
      animatedOption: '🎨 Мультфильмы',
      animatedOptionDesc: 'Полнометражная анимация, аниме, CGI и классика',
      bothOption: '✨ И то, и другое (Рекомендуется)',
      step3Title: 'Какие жанры вам по душе?',
      step3Subtitle: 'Выберите любимые направления для точных рекомендаций.',
      step4Title: 'Выберите язык интерфейса',
      step4Subtitle: 'CineMate полностью адаптируется под выбранный язык.',
      skip: 'Пропустить пока',
      next: 'Продолжить',
      back: 'Назад',
      finish: 'Начать знакомство',
      usernameRequired: 'Пожалуйста, введите никнейм для продолжения.',
    },
    search: {
      title: 'Поиск по каталогу',
      placeholder: 'Ищите по названию, режиссёру, актёру, жанру или году...',
      allTypes: 'Все категории',
      moviesOnly: '🎬 Только фильмы',
      animatedOnly: '🎨 Только мультфильмы',
      allGenres: 'Все жанры',
      allYears: 'Все годы',
      minRating: 'Мин. рейтинг',
      sortBy: 'Сортировка',
      sortPopular: 'Популярность',
      sortRating: 'Высокий рейтинг',
      sortNewest: 'Дата премьеры',
      sortTitle: 'По алфавиту (А-Я)',
      resultsFound: 'найдено совпадений',
      noResults: 'По вашему запросу ничего не найдено',
      noResultsTip: 'Попробуйте изменить формулировку или сбросить фильтры.',
      clearFilters: 'Сбросить фильтры',
    },
    favorites: {
      title: 'Моё избранное',
      subtitle: 'Ваша личная золотая коллекция любимых картин',
      emptyMovies: 'В избранном пока нет фильмов.',
      emptyAnimated: 'В избранном пока нет мультфильмов.',
      browseMovies: 'Найти фильмы',
      browseAnimated: 'Найти мультфильмы',
      clearAll: 'Очистить избранное',
    },
    watchlist: {
      title: 'Список к просмотру',
      subtitle: 'Сохраняйте картины на потом и отмечайте просмотренные',
      tabAll: 'Все',
      tabUnwatched: 'Запланировано',
      tabWatched: 'Просмотрено',
      markWatched: 'Отметить просмотренным',
      markUnwatched: 'Вернуть в план',
      remove: 'Удалить',
      emptyWatchlist: 'Ваш список к просмотру пуст.',
      browseToWatch: 'Исследуйте каталог и добавляйте интересные ленты',
    },
    settings: {
      title: 'Настройки и предпочтения',
      subtitle: 'Управление псевдонимом, языком, рекомендациями и локальными данными',
      profileSection: 'Псевдоним профиля',
      nicknameLabel: 'Ваш никнейм',
      nicknameNotice: 'В целях приватности используйте никнейм вместо реального имени.',
      saveNickname: 'Обновить никнейм',
      savedSuccess: 'Настройки успешно сохранены!',
      languageSection: 'Язык интерфейса',
      contentSection: 'Предпочтения контента',
      genresSection: 'Любимые жанры',
      dataSection: 'Данные и конфиденциальность',
      clearFavoritesConfirm: 'Очистить всё избранное? Это действие необратимо.',
      clearWatchlistConfirm: 'Очистить список к просмотру? Это действие необратимо.',
      resetAllConfirm: 'Сбросить все настройки и историю просмотров?',
      apiStatusTitle: 'Архитектура данных',
      apiStatusDesc: 'CineMate построен на модульном слое сервисов, готовом к интеграции с API метаданных (TMDB и др.).',
      demoNotice: 'Активен демо-режим: Каталог наполнен проверенными метаданными и официальными трейлерами.',
    },
    assistant: {
      title: 'Ассистент MO-VIE',
      greeting: 'Привет! Я MO-VIE, ваш персональный проводник по фильмам и анимации. Я помогу найти шедевры, идеально подходящие вашему вкусу.',
      inputPlaceholder: 'Спросите о фильмах, актёрах, жанрах или попросите совет...',
      send: 'Отправить',
      thinking: 'MO-VIE думает...',
      suggestionsTitle: 'Попробуйте спросить:',
      disclaimer: 'Персонализировано по вашим оценкам. Только кино и анимация.',
      offTopicNotice: 'Я — MO-VIE, и специализируюсь исключительно на кино и анимации. Спросите меня о фильме, жанре, актёре или о том, что посмотреть!',
      clearChat: 'Очистить чат',
    },
    demoBanner: {
      badge: 'ДЕМО РЕЖИМ',
      info: 'Работает на кураторском каталоге CineMate. Готов к подключению внешнего API.',
      viewApiStatus: 'Инфо об API',
    },
  },
};
