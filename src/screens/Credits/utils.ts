import { SocialMedia } from "../../components/Icons";
import { ExternalLinks, Movie, PersonCredits } from "../../models";
import { sortBy } from "lodash";

export type SocialMediaLinks = { type: SocialMedia; url: string }[];

export function mapToSocialMediaLinks(links: ExternalLinks): SocialMediaLinks {
  const socialMedia: SocialMediaLinks = [];

  if (links.twitterId)
    socialMedia.push({
      type: "twitter",
      url: `https://twitter.com/${links.twitterId}`,
    });

  if (links.instagramId)
    socialMedia.push({
      type: "instagram",
      url: `https://instagram.com/${links.instagramId}`,
    });

  if (links.facebookId)
    socialMedia.push({
      type: "facebook",
      url: `https://facebook.com/${links.facebookId}`,
    });

  return socialMedia;
}

export type KnownForMedia = Pick<
  Movie,
  | "id"
  | "overview"
  | "title"
  | "posterPath"
  | "backdropPath"
  | "voteAverage"
  | "voteCount"
  | "releaseDate"
>;

export function sortPersonCreditsByMostRelevance(
  credits: PersonCredits
): KnownForMedia[] {
  const mediaFromCast: KnownForMedia[] = credits.cast.map((cast) => ({
    id: cast.id,
    overview: cast.overview,
    title: cast.title ?? cast.name ?? "",
    posterPath: cast.posterPath,
    backdropPath: cast.backdropPath,
    voteAverage: cast.voteAverage,
    voteCount: cast.voteCount,
    releaseDate: cast.releaseDate,
  }));
  const mediaFromCrew: KnownForMedia[] = credits.crew.map((crew) => ({
    id: crew.id,
    overview: crew.overview,
    title: crew.title ?? crew.name ?? "",
    posterPath: crew.posterPath,
    backdropPath: crew.backdropPath,
    voteAverage: crew.voteAverage,
    voteCount: crew.voteCount,
    releaseDate: crew.releaseDate,
  }));

  const unique = [...mediaFromCast, ...mediaFromCrew].reduce(
    (result: KnownForMedia[], media: KnownForMedia) => {
      if (
        result.find((r) => r.id === media.id) === undefined &&
        media.voteCount > 0 &&
        media.voteAverage > 0
      )
        result.push(media);
      return result;
    },
    []
  );

  const sorted = sortBy(unique, ["voteCount", "voteAverage"]).reverse();

  return sorted;
}
