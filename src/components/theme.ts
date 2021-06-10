import { TextStyle } from "react-native";

export const Palette = {
  White: `#FFFFFF`,
  Transparent: `#00000000`,
  Grey: {
    Primary: `#313335`,
  },
  Orange: {
    L2: `#FFC096`,
  },
  Yellow: {
    L1: `#FFC453`,
    Primary: `#CF9631`,
  },
  Red: {
    L2: `#F88AA2`,
    L1: `#FC766D`,
    Primary: `#DC1F58`,
  },
  Green: {
    L1: `#5BDE95`,
    Primary: `#21AF85`,
    D1: `#008060`,
    D2: `#29856E`,
  },
  Blue: {
    L1: `#4DB4F7`,
    Primary: `#38A5FF`,
    D1: `#2E72D2`,
    D2: `#2C6FCD`,
    D3: `#0870D9`,
  },
};

export const Colors = {
  SurfaceBackground: `#0D0D0D`,
  SurfaceBackgroundPressed: `#1B1B1B`,
  SurfaceForeground: `#202122`,
  SurfaceForegroundPressed: `#2D2E30`,
  SurfaceNeutral: `#333536`,

  Border: `#5B5F61`,
  BorderSubdued: Palette.Grey.Primary,

  ActionNeutral: Palette.Grey.Primary,
  ActionNeutralPressed: `#404245`,
  ActionPrimary: Palette.Blue.D1,
  ActionPrimaryPressed: `#498AF2`,

  TextNeutral: `#E3E5E7`,
  TextSubdued: `#989FA4`,
  TextDisabled: `#6F7377`,
  TextInteractive: Palette.Blue.Primary,
  TextHighlight: `#55BFCC`,

  TextOnSurfacePrimary: Palette.White,
  TextOnSurfaceNeutral: `#C6CDD1`,

  IconOnPrimary: Palette.White,
  IconNeutral: `#A6ACB2`,
  IconSubdued: `#787D81`,
  IconDisabled: `#54575B`,
  IconInteractive: Palette.Blue.Primary,
  IconHighlight: `#35ADB9`,

  Transparent: Palette.Transparent,
  None: undefined,
};

export const TextVariants: Record<
  | "pageHeading"
  | "sectionHeading"
  | "captionHeadingRegular"
  | "captionHeadingSmall"
  | "body",
  TextStyle
> = {
  pageHeading: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 34,
    letterSpacing: 0.2,
    color: Colors.TextNeutral,
  },
  sectionHeading: {
    fontFamily: "System",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
    color: Colors.TextNeutral,
  },
  captionHeadingRegular: {
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: 0.2,
    color: Colors.TextNeutral,
  },
  captionHeadingSmall: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    color: Colors.TextNeutral,
  },
  body: {
    fontFamily: "System",
    fontSize: 15,
    fontWeight: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    color: Colors.TextNeutral,
  },
};

type Space = 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 13 | 16;
const spacing = (space: Space): number => 8 * space;
export const Spacing = {
  defaultMargin: spacing(2),
  xl: spacing(3),
  l: spacing(2),
  m: spacing(1),
  s: spacing(0.5),
};
