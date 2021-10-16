import { useCallback, useState } from "react";
import { indexOf } from "lodash";
import { fetchRequest } from "../../api";
import { convertToCamelCase } from "../../utils";
import { useSession } from "../Login/SessionProvider";
import { StarRating, starRatings } from "./utils";

interface State {
  submitting: boolean;
  error?: string;
  submit: (
    id: number,
    rating: StarRating,
    feedbackOptions: string[]
  ) => Promise<void>;
}

interface Response {
  statusCode: number;
  statusMessage: string;
}

// save to preferences - use observableState to share state to MediaDetailsScreen
export const useAddRating = (): State => {
  const { sessionId } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const submit = useCallback(
    async (id: number, rating: StarRating, feedbackOptions: string[]) => {
      setSubmitting(true);

      try {
        if (sessionId === undefined) {
          throw new Error("Invalid session id");
        }

        const json = await fetchRequest("AddRating", {
          sessionId,
          movieId: id,
          rating: (indexOf(starRatings, rating) + 1) * 2,
        }).fetch();

        const { statusCode } = convertToCamelCase(json) as Response;
        if (statusCode !== 1) {
          throw new Error("Failed to post rating to TMDB server");
        }

        setSubmitting(false);
        setError(undefined);
      } catch (error) {
        setSubmitting(false);
        setError(error.message ?? "Adding rating failed");
        console.error("Failed to add rating due to error:", error.message);
      }
    },
    [sessionId]
  );

  return {
    submitting,
    error,
    submit,
  };
};
