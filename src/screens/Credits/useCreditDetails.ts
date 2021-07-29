import { useCallback, useEffect, useState } from "react";
import { fetchRequest } from "../../api";
import { PersonDetails, PersonImages } from "../../models";
import { convertToCamelCase } from "../../utils";
import { GalleryImage } from "../Gallery/utils";
import {
  SocialMediaLinks,
  KnownForMedia,
  mapToSocialMediaLinks,
  sortPersonCreditsByMostRelevance,
} from "./utils";

interface State {
  loading: boolean;
  error?: string;
  personDetails?: PersonDetails;
  socialMediaLinks?: SocialMediaLinks;
  knownForMedia?: KnownForMedia[];
  images?: GalleryImage[];
  refetch: () => void;
}

export const useCreditDetails = (id: number): State => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [details, setDetails] = useState<PersonDetails>();
  const [links, setLinks] = useState<SocialMediaLinks>();
  const [media, setMedia] = useState<KnownForMedia[]>();
  const [images, setImages] = useState<GalleryImage[]>();

  const fetch = useCallback(async () => {
    const personDetails = fetchRequest("PersonDetails", { personId: id });
    const externalLinks = fetchRequest("PersonExternalIds", { personId: id });
    const credits = fetchRequest("PersonMovieCredits", { personId: id });
    const images = fetchRequest("PersonImages", { personId: id });

    return Promise.all([
      personDetails.fetch(),
      externalLinks.fetch(),
      credits.fetch(),
      images.fetch(),
    ])
      .then((jsons) => {
        const [details, links, credits, images] = jsons.map((json) =>
          convertToCamelCase(json)
        );
        setDetails(details);
        setLinks(mapToSocialMediaLinks(links));
        setMedia(sortPersonCreditsByMostRelevance(credits));
        setImages(mapToGalleryImages(images));
      })
      .catch((error) => {
        console.error(
          "[useCreditDetails] Failed to resolve all requests due to error:",
          error.message
        );
        setError(error.message);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch().then(() => setLoading(false));
    }, 500);
  }, [fetch]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      fetch().then(() => setLoading(false));
    }, 500);
  }, [fetch]);

  return {
    loading,
    error,
    personDetails: details,
    socialMediaLinks: links,
    knownForMedia: media,
    images,
    refetch,
  };
};

// Utils

function mapToGalleryImages(images: PersonImages): GalleryImage[] {
  return images.profiles.map((image) => ({
    path: image.filePath,
    type: "profile",
    width: image.width,
    height: image.height,
    orientation: image.aspectRatio > 1 ? "landscape" : "portrait",
  }));
}
