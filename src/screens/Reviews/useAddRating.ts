import { useCallback, useState } from "react";
import { indexOf } from "lodash";
import { fetchRequest } from "../../api";
import { convertToCamelCase } from "../../utils";
import { useSession } from "../Login/SessionProvider";
import { FeedbackOptionKeys, StarRating, starRatings } from "./utils";
import { useRatedList } from "./useRatedList";

interface State {
  submitting: boolean;
  status?: Status;
  error?: string;
  submit: (
    rating: StarRating,
    feedbackOptions: FeedbackOptionKeys[]
  ) => Promise<void>;
}

type Status = "success" | "failure";

interface Response {
  statusCode: number;
  statusMessage: string;
}

// map status codes correctly
export const useAddRating = (id: number): State => {
  const { sessionId } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>();
  const [error, setError] = useState<string>();
  const { updateMediaForId } = useRatedList();

  const submit = useCallback(
    async (rating: StarRating, feedbackOptions: FeedbackOptionKeys[]) => {
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
        if (statusCode !== 1 && statusCode !== 12) {
          throw new Error("Failed to post rating to TMDB server");
        }

        updateMediaForId(id, rating, feedbackOptions);

        setSubmitting(false);
        setStatus("success");
        setError(undefined);
      } catch (error) {
        setSubmitting(false);
        setStatus("failure");
        setError(error.message ?? "Adding rating failed");
        console.error("Failed to add rating due to error:", error.message);
      }
    },
    [sessionId, updateMediaForId, id]
  );

  return {
    submitting,
    status,
    error,
    submit,
  };
};
