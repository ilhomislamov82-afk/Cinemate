import { MovieItem, ContentType, FilterState, UserPreferences, ApiStatus } from '../types';
import { MOVIE_DATABASE, GENRE_LIST } from '../data/movieDatabase';

class MovieService {
  private database: MovieItem[] = MOVIE_DATABASE;
  private isDemoMode: boolean = true;

  /**
   * Status information for the current data source
   */
  public getApiStatus(): ApiStatus {
    return {
      mode: this.isDemoMode ? 'demo' : 'live',
      provider: 'CineMate Verified Metadata & Trailer Repository',
      details: 'Architecture is prepared for seamless connection to TMDB / IMDb REST API or backend proxy via VITE_TMDB_API_KEY.',
    };
  }

  /**
   * Get all supported genres
   */
  public getGenres(): string[] {
    return [...GENRE_LIST];
  }

  /**
   * Get all items of a specific content category (movies or animated)
   */
  public getByCategory(type: ContentType): MovieItem[] {
    return this.database.filter((item) => item.type === type);
  }

  /**
   * Trending This Month - exactly 10 items for the requested category
   */
  public getTrending(type: ContentType, limit: number = 10): MovieItem[] {
    return this.database
      .filter((m) => m.type === type && m.isTrending)
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  }

  /**
   * Top Rated This Year - rating-based list from current / recent years
   */
  public getTopRated(type: ContentType, limit: number = 10): MovieItem[] {
    return this.database
      .filter((m) => m.type === type)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  /**
   * Recently Released
   */
  public getRecentlyReleased(type: ContentType, limit: number = 10): MovieItem[] {
    return this.database
      .filter((m) => m.type === type && (m.isRecentlyReleased || m.year >= 2023))
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, limit);
  }

  /**
   * Retrieve a movie by its unique identifier
   */
  public async getById(id: string): Promise<MovieItem | undefined> {
    return this.database.find((m) => m.id === id);
  }

  /**
   * Retrieve multiple movies by ID
   */
  public getByIds(ids: string[]): MovieItem[] {
    return this.database.filter((m) => ids.includes(m.id));
  }

  /**
   * Similar movies / More Like This
   */
  public getSimilarMovies(movie: MovieItem, limit: number = 6): MovieItem[] {
    return this.database
      .filter((m) => m.id !== movie.id && m.type === movie.type)
      .map((m) => {
        let score = 0;
        // Shared genres count
        const shared = m.genres.filter((g) => movie.genres.includes(g)).length;
        score += shared * 3;
        // Same director
        if (m.director === movie.director) score += 5;
        // Release era proximity
        if (Math.abs(m.year - movie.year) <= 3) score += 2;
        return { item: m, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((entry) => entry.item);
  }

  /**
   * Get movies by specific genre for a content type
   */
  public getByGenre(genre: string, type?: ContentType, limit: number = 8): MovieItem[] {
    return this.database
      .filter((m) => {
        const matchesType = type ? m.type === type : true;
        const matchesGenre = m.genres.some((g) => g.toLowerCase() === genre.toLowerCase());
        return matchesType && matchesGenre;
      })
      .slice(0, limit);
  }

  /**
   * Personalized Recommendations
   * Combines user's favorite genres, ratings, favorites, watchlist, and viewing history
   */
  public getPersonalizedRecommendations(
    preferences: UserPreferences,
    restrictType?: ContentType,
    limit: number = 10
  ): MovieItem[] {
    const favoriteGenreSet = new Set(preferences.favoriteGenres || []);
    const ratedKeys = Object.keys(preferences.ratings || {});
    const highRatedIds = ratedKeys.filter((id) => preferences.ratings[id] >= 7);
    const favoriteIds = preferences.favorites || [];
    const watchlistIds = preferences.watchlist?.map((w) => w.id) || [];

    // Tastes derived from favorites and high ratings
    const tasteGenreWeights: Record<string, number> = {};
    favoriteGenreSet.forEach((g) => {
      tasteGenreWeights[g] = (tasteGenreWeights[g] || 0) + 4;
    });

    [...highRatedIds, ...favoriteIds].forEach((id) => {
      const item = this.database.find((m) => m.id === id);
      if (item) {
        item.genres.forEach((g) => {
          tasteGenreWeights[g] = (tasteGenreWeights[g] || 0) + 2;
        });
      }
    });

    const candidatePool = this.database.filter((m) => {
      // Exclude already added to favorites to keep recommendations fresh
      if (favoriteIds.includes(m.id)) return false;
      if (restrictType && m.type !== restrictType) return false;
      if (
        !restrictType &&
        preferences.contentPreference !== 'both' &&
        m.type !== preferences.contentPreference
      ) {
        return false;
      }
      return true;
    });

    return candidatePool
      .map((m) => {
        let affinityScore = 0;
        m.genres.forEach((g) => {
          if (tasteGenreWeights[g]) {
            affinityScore += tasteGenreWeights[g];
          }
        });
        if (watchlistIds.includes(m.id)) {
          affinityScore += 3;
        }
        // Incorporate general quality rating
        affinityScore += m.rating * 1.5;
        return { item: m, affinityScore };
      })
      .sort((a, b) => b.affinityScore - a.affinityScore)
      .slice(0, limit)
      .map((entry) => entry.item);
  }

  /**
   * Full search with filters and sorting
   */
  public search(filters: FilterState): MovieItem[] {
    const q = filters.query.trim().toLowerCase();

    return this.database.filter((m) => {
      // Content Type Filter
      if (filters.type !== 'all' && m.type !== filters.type) {
        return false;
      }

      // Genre Filter
      if (filters.genre && filters.genre !== 'all') {
        const hasGenre = m.genres.some((g) => g.toLowerCase() === filters.genre.toLowerCase());
        if (!hasGenre) return false;
      }

      // Year Filter
      if (filters.year && filters.year !== 'all') {
        if (m.year.toString() !== filters.year) return false;
      }

      // Min Rating Filter
      if (filters.minRating > 0 && m.rating < filters.minRating) {
        return false;
      }

      // Keyword match across title, director, actors, and genres
      if (q) {
        const titleMatch = m.title.toLowerCase().includes(q);
        const directorMatch = m.director.toLowerCase().includes(q);
        const castMatch = m.cast.some((c) => c.toLowerCase().includes(q));
        const genreMatch = m.genres.some((g) => g.toLowerCase().includes(q));
        const yearMatch = m.year.toString() === q;
        if (!titleMatch && !directorMatch && !castMatch && !genreMatch && !yearMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
        default:
          return b.popularityScore - a.popularityScore;
      }
    });
  }

  /**
   * Catalog summary for AI assistant context
   */
  public getCatalogSummary(): string {
    return this.database
      .map((m) => `ID:${m.id} | Title:"${m.title}" (${m.year}) | Type:${m.type} | Genres:${m.genres.join(', ')} | Rating:${m.rating} | Dir:${m.director}`)
      .join('\n');
  }
}

export const movieService = new MovieService();
