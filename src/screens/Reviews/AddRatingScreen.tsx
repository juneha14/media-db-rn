import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { indexOf, isEqual } from "lodash";
import { Avatar } from "../../components/Avatar";
import { Box } from "../../components/Box";
import { StarIcon } from "../../components/Icons";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";
import { TagList } from "../../components/Tags";
import { Button } from "../../components/Button";
import { BackNavigationButton } from "../shared";
import {
  StarRating,
  starRatings,
  descriptionForStarRating,
  feedbackOptionsForStarRating,
  FeedbackOptions,
  FeedbackOptionKeys,
} from "./utils";
import {
  useAppModalNavigation,
  useImageUri,
  useRouteParams,
} from "../../hooks";
import { useAddRating } from "./useAddRating";
import { Toast } from "../../components/Toast";

export const AddRatingScreen: React.FC = () => {
  const {
    params: { id, imgUrl, title, ratingDetails },
  } = useRouteParams<"AddRating">();
  const { pop } = useAppModalNavigation();

  const { top, bottom } = useSafeAreaInsets();
  const uri = useImageUri("poster", "Original", imgUrl);

  const { submitting, status, error, submit } = useAddRating(id);

  /* Local state to handle user input */

  const [rating, setRating] = useState<StarRating | undefined>(
    ratingDetails?.rating
  );
  const [feedback, setFeedback] = useState<FeedbackOptionKeys[]>(
    ratingDetails?.feedback ?? []
  );

  const onSelectRating = useCallback(
    (rating: StarRating) => {
      setRating(rating);

      // Whenever user selects a new rating, reset the selected feedback options
      // If user selects the same initial rating, populate the initial feedback options
      setFeedback(
        rating === ratingDetails?.rating ? ratingDetails.feedback : []
      );
    },
    [ratingDetails]
  );

  const onSelectFeedback = useCallback((feedback: FeedbackOptionKeys) => {
    setFeedback((oldFeedback) => {
      let newFeedback;
      if (oldFeedback.includes(feedback)) {
        newFeedback = oldFeedback.filter((o) => o !== feedback);
      } else {
        newFeedback = [...oldFeedback, feedback];
      }

      return newFeedback;
    });
  }, []);

  useEffect(() => {
    if (status === "success") {
      pop();
    }
  }, [status, pop]);

  return (
    <>
      <BackNavigationButton
        respectsTopInset={false}
        type="cancel"
        onNavigateBack={() => pop()}
      />
      {error && !submitting ? (
        <Toast
          type="error"
          title="Could not add rating. Please try again."
          respectsTopInset={false}
        />
      ) : null}
      <Box style={styles.container}>
        <Box style={[styles.contentContainer, { marginTop: top + 30 }]}>
          <Avatar style={styles.avatar} url={uri} size={150} />
          <>
            <Text
              style={{
                textAlign: "center",
                marginBottom: rating === undefined ? undefined : Spacing.m,
              }}
              variant="sectionHeading"
            >
              {`How was ${title}?`}
            </Text>
            {rating && (
              <Text
                variant="captionHeadingSmall"
                color={Colors.TextOnSurfaceNeutral}
              >
                {descriptionForStarRating[rating]}
              </Text>
            )}
          </>
          <Stars rating={rating} onSelectRating={onSelectRating} />
          {rating && (
            <FeedbackPills
              rating={rating}
              feedback={feedback}
              onSelectFeedback={onSelectFeedback}
            />
          )}
        </Box>
        <Button
          style={{
            marginBottom: bottom,
            marginHorizontal: Spacing.defaultMargin,
          }}
          title="Submit"
          enabled={
            rating !== ratingDetails?.rating ||
            !isEqual(feedback, ratingDetails?.feedback)
          }
          loading={submitting}
          onPress={() => rating && submit(rating, feedback ?? [])}
        />
      </Box>
    </>
  );
};

const Stars = ({
  rating,
  onSelectRating,
}: {
  rating?: StarRating;
  onSelectRating: (rating: StarRating) => void;
}) => {
  return (
    <Box style={styles.starRatingContainer}>
      {starRatings.map((star, index) => {
        return (
          <StarIcon
            key={star}
            selected={index <= indexOf(starRatings, rating)}
            onPress={() => onSelectRating(star)}
          />
        );
      })}
    </Box>
  );
};

const FeedbackPills = ({
  rating,
  feedback,
  onSelectFeedback,
}: {
  rating: StarRating;
  feedback: FeedbackOptionKeys[];
  onSelectFeedback: (feedback: FeedbackOptionKeys) => void;
}) => {
  const options = feedbackOptionsForStarRating[rating];

  return (
    <TagList
      tags={options.map((option) => {
        return {
          title: FeedbackOptions[option],
          borderColor: Colors.BorderSubdued,
          fillColor: feedback.includes(option)
            ? Colors.ActionPrimaryPressed
            : Colors.ActionNeutralPressed,
          onPress: () => onSelectFeedback(option),
        };
      })}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.SurfaceBackgroundPressed,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.defaultMargin,
  },
  avatar: {
    marginBottom: Spacing.defaultMargin,
  },
  starRatingContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 32,
  },
});
