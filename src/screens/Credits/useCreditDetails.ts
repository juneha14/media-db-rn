import { useCallback, useEffect, useState } from "react";
import { fetchRequest } from "../../api/service";
import { PersonDetails } from "../../models";
import { convertToCamelCase } from "../../utils";
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
  refetch: () => void;
}

export const useCreditDetails = (id: number): State => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [details, setDetails] = useState<PersonDetails>();
  const [links, setLinks] = useState<SocialMediaLinks>();
  const [media, setMedia] = useState<KnownForMedia[]>();

  const fetch = useCallback(async () => {
    const personDetails = fetchRequest("PersonDetails", { personId: id });
    const externalLinks = fetchRequest("PersonExternalIds", { personId: id });
    const credits = fetchRequest("PersonMovieCredits", { personId: id });

    return Promise.all([personDetails, externalLinks, credits])
      .then((jsons) => {
        const [details, links, credits] = jsons.map((json) =>
          convertToCamelCase(json)
        );
        setDetails(details);
        setLinks(mapToSocialMediaLinks(links));
        setMedia(sortPersonCreditsByMostRelevance(credits));
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
    refetch,
  };
};
