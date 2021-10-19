import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { indexOf } from "lodash";
import { Avatar } from "../../components/Avatar";
import { Box } from "../../components/Box";
import { StarIcon } from "../../components/Icons";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";
import { TagList } from "../../components/Tags";
import {
  StarRating,
  starRatings,
  descriptionForStarRating,
  feedbackOptionsForStarRating,
  FeedbackOptions,
  FeedbackOptionKeys,
} from "./utils";
import { BackNavigationButton } from "../shared";
import {
  useAppModalNavigation,
  useImageUri,
  useRouteParams,
} from "../../hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddRating } from "./useAddRating";

// convert star rating to number rating and post to database
// store rating in local prefs so that we can update the rating as opposed to creating new ones

export const AddRatingScreen: React.FC = () => {
  const {
    params: { id, imgUrl, title },
  } = useRouteParams<"AddRating">();
  const { pop } = useAppModalNavigation();

  const { top, bottom } = useSafeAreaInsets();
  const uri = useImageUri("poster", "Original", imgUrl);

  const [rating, setRating] = useState<StarRating>();
  // const { submitting, error, submit } = useAddRating();

  return (
    <>
      <BackNavigationButton
        respectsTopInset={false}
        type="cancel"
        onNavigateBack={() => pop()}
      />
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
          <Stars onSelectRating={setRating} />
          {rating && <FeedbackPills rating={rating} />}
        </Box>
        <Pressable style={[styles.submitButton, { marginBottom: bottom }]}>
          <Text variant="captionHeadingSmall">Submit</Text>
        </Pressable>
      </Box>
    </>
  );
};

const Stars = ({
  onSelectRating,
}: {
  onSelectRating: (rating: StarRating) => void;
}) => {
  const [rating, setRating] = useState<StarRating>();
  const onPress = useCallback(
    (rating: StarRating) => () => {
      setRating(rating);
      onSelectRating(rating);
    },
    [onSelectRating]
  );

  return (
    <Box style={styles.starRatingContainer}>
      {starRatings.map((star, index) => {
        return (
          <StarIcon
            key={star}
            selected={index <= indexOf(starRatings, rating)}
            onPress={onPress(star)}
          />
        );
      })}
    </Box>
  );
};

const FeedbackPills = ({ rating }: { rating: StarRating }) => {
  const options = feedbackOptionsForStarRating[rating];

  const [selectedOptions, setSelectedOptions] = useState<
    Set<FeedbackOptionKeys>
  >(new Set([]));

  useEffect(() => {
    // Whenever user selects a new rating, reset the selected feedback options
    setSelectedOptions(new Set());
  }, [rating]);

  const onSelectOption = useCallback((newOption: FeedbackOptionKeys) => {
    setSelectedOptions((options) => {
      const oldOptions = Array.from(options);
      if (options.has(newOption)) {
        return new Set(oldOptions.filter((o) => o !== newOption));
      } else {
        return new Set([...oldOptions, newOption]);
      }
    });
  }, []);

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
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.defaultMargin,
    marginHorizontal: Spacing.defaultMargin,
    borderRadius: 8,
    backgroundColor: Colors.ActionPrimary,
  },
});
