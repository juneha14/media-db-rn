import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { indexOf } from "lodash";
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
    params: { id, imgUrl, title },
  } = useRouteParams<"AddRating">();
  const { pop } = useAppModalNavigation();

  const { top, bottom } = useSafeAreaInsets();
  const uri = useImageUri("poster", "Original", imgUrl);

  const {
    submitting,
    status,
    error,
    submit,
    previousRating,
    previousFeedback,
  } = useAddRating(id);

  const [rating, setRating] = useState<StarRating | undefined>(previousRating);
  const [feedback, setFeedback] = useState<FeedbackOptionKeys[] | undefined>(
    previousFeedback ?? []
  );

  useEffect(() => {
    setRating(previousRating);
    setFeedback(previousFeedback);
  }, [previousRating, previousFeedback]);

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
          <Avatar style={styles.avatar} url={uri} size={120} />
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
          <Stars rating={rating} onSelectRating={setRating} />
          {rating && (
            <FeedbackPills
              previousFeedback={feedback}
              rating={rating}
              onUpdateFeedback={setFeedback}
            />
          )}
        </Box>
        <Button
          style={{
            marginBottom: bottom,
            marginHorizontal: Spacing.defaultMargin,
          }}
          title="Submit"
          enabled={rating !== undefined}
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
  previousFeedback,
  rating,
  onUpdateFeedback,
}: {
  previousFeedback?: FeedbackOptionKeys[];
  rating: StarRating;
  onUpdateFeedback: (options: FeedbackOptionKeys[]) => void;
}) => {
  const options = feedbackOptionsForStarRating[rating];

  const [selectedOptions, setSelectedOptions] = useState<
    Set<FeedbackOptionKeys>
  >(previousFeedback ? new Set(previousFeedback) : new Set([]));

  useEffect(() => {
    setSelectedOptions(
      previousFeedback ? new Set(previousFeedback) : new Set([])
    );
  }, [previousFeedback]);

  console.log("==== Value of selectedOptions:", selectedOptions);

  useEffect(() => {
    // Whenever user selects a new rating, reset the selected feedback options
    setSelectedOptions(new Set());
    onUpdateFeedback([]);
  }, [rating, onUpdateFeedback]);

  const onSelectOption = useCallback(
    (newOption: FeedbackOptionKeys) => {
      setSelectedOptions((options) => {
        const oldOptions = Array.from(options);
        let newOptions;
        if (options.has(newOption)) {
          newOptions = new Set(oldOptions.filter((o) => o !== newOption));
        } else {
          newOptions = new Set([...oldOptions, newOption]);
        }

        onUpdateFeedback(Array.from(newOptions));
        return newOptions;
      });
    },
    [onUpdateFeedback]
  );

  return (
    <TagList
      tags={options.map((option) => {
        return {
          title: FeedbackOptions[option],
          borderColor: Colors.BorderSubdued,
          fillColor: selectedOptions.has(option)
            ? Colors.ActionPrimaryPressed
            : Colors.ActionNeutralPressed,
          onPress: () => onSelectOption(option),
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
