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

export const FeedbackOptions = {
  // Common
  wouldNotRecommend: "Would not recommend",

  // Bad
  badCast: "Bad cast",
  awfulProduction: "Awful production",
  badPlot: "Bad script",
  awfullyBoring: "Awfully boring",
  wouldNotPayToRewatch: "Would not pay to rewatch",
  wasteOfTime: "Waste of time",

  // Poor
  poorCast: "Poor cast",
  poorProduction: "Poorly produced",
  poorActing: "Poor acting",
  boring: "Boring",
  wouldNotRewatch: "Would not rewatch",

  // Average
  decentCast: "Decent cast",
  decentProduction: "Decent production",
  decentPlot: "Okay plot - kind of expected",
  mightRewatch: "Might rewatch if nothing else was available",
  mightRecommend: "Might recommend",

  // Good
  goodCast: "Good cast",
  goodProduction: "Good production",
  goodPlot: "Well developed plot / story",
  rewatchWorthy: "Rewatch worthy",
  wouldRecommend: "Would recommend",

  // Excellent
  excellentCast: "Excellent cast",
  excellentProduction: "Excellently produced",
  excellentPlot: "Excellently written",
  excellentMusic: "Great music",
  tenOfTen: "10/10 would rewatch",
};

export type FeedbackOptionKeys = keyof typeof FeedbackOptions;

export const feedbackOptionsForStarRating: Record<
  StarRating,
  FeedbackOptionKeys[]
> = {
  bad: [
    "badCast",
    "awfulProduction",
    "badPlot",
    "awfullyBoring",
    "wouldNotPayToRewatch",
    "wouldNotRecommend",
    "wasteOfTime",
  ],
  poor: [
    "poorCast",
    "poorProduction",
    "poorActing",
    "boring",
    "wouldNotRecommend",
    "wouldNotRewatch",
  ],
  average: [
    "decentCast",
    "decentProduction",
    "decentPlot",
    "mightRewatch",
    "mightRecommend",
  ],
  good: [
    "goodCast",
    "goodProduction",
    "goodPlot",
    "rewatchWorthy",
    "wouldRecommend",
  ],
  excellent: [
    "excellentCast",
    "excellentProduction",
    "excellentPlot",
    "excellentMusic",
    "tenOfTen",
  ],
};
