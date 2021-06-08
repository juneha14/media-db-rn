/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const API_KEY = "37bbcf6f05e7c353e1715488f9c723a1";
const baseUrl = "https://api.themoviedb.org/3";

interface MetaData {
  method: "GET" | "POST";
  body?: string;
  headers: Record<string, string>;
}

// Client

export async function client(
  url: string,
  headers?: Record<string, string>,
  body?: any
): Promise<any> {
  const metaData: MetaData = {
    method: body ? "POST" : "GET",
    headers: { ...headers, "Content-Type": "application/json" },
  };

  if (body) {
    metaData.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, metaData);
    const data = await res.json();

    if (res.ok) return data;
    throw new Error(res.statusText);
  } catch (error) {
    console.error(
      `Failed to ${metaData.method} from ${url} due to error:`,
      error
    );
    return Promise.reject(error.message);
  }
}

// Movies

client.getNowPlayingMovies = async (page = 1) => {
  const url = constructUrl("/movie/now_playing", { page });
  return client(url);
};

client.getMovieDetails = async (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}`, { movieId });
  return client(url);
};

client.getMovieCredits = async (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/credits`);
  return client(url);
};

client.getMovieRecommendations = async (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/recommendations`);
  return client(url);
};

client.getPersonDetails = async (personId: number) => {
  const url = constructUrl(`/person/${personId}`);
  return client(url);
};

client.getPersonExternalLinks = async (personId: number) => {
  const url = constructUrl(`/person/${personId}/external_ids`);
  return client(url);
};

client.getPersonCombinedCredits = async (personId: number) => {
  const url = constructUrl(`/person/${personId}/combined_credits`);
  return client(url);
};

// Helpers

type ResourcePath = string;

function constructUrl(path: ResourcePath, searchParams?: Record<string, any>) {
  const url = new URL(path, baseUrl);
  url.searchParams.append("api_key", API_KEY);

  if (searchParams) {
    Object.entries(searchParams)
      .filter(([, val]) => val !== undefined)
      .forEach(([key, val]) => {
        url.searchParams.append(key, val);
      });
  }

  return url.toString();
}
