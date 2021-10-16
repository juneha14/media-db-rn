export const starRatings = [
  "bad",
  "poor",
  "average",
  "good",
  "excellent",
] as const;

export type StarRating = typeof starRatings[number];

export const descriptionForStarRating: Record<StarRating, string> = {
  bad: "Bad. What did you not like about it?",
  poor: "Poor. What did you not like about it?",
  average: "Just average. What did you not like about it?",
  good: "Pretty good. What could be better?",
  excellent: "Excellent rating! What did you enjoy?",
};

export const feedbackOptionsForStarRating: Record<StarRating, string[]> = {
  bad: ["Bad casting", "Bad production", "Boring", "Too long / too short"],
  poor: [
    "Poor casting",
    "Poor production",
    "Not engaging",
    "Too long / too short",
  ],
  average: [
    "Decent casting",
    "Average production",
    "Meh acting",
    "Was anticipating more",
  ],
  good: [
    "Good casting",
    "Good production",
    "Good acting",
    "Not worth the hype",
  ],
  excellent: [
    "Great cast",
    "Top production",
    "Top acting",
    "Engaging",
    "Rewatch-worthy",
  ],
};
