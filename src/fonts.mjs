import { fontProviders } from "astro/config";

const SPACE_MONO_DIRECTORY = "./src/fonts/space-mono";
const MONOTON_DIRECTORY = "./src/fonts/monoton";
const SPACE_MONO_WEIGHTS = [400, 700];
const SPACE_MONO_STYLES = ["normal", "italic"];

const GOOGLE_FONTS_SUBSET_RANGES = {
  latin: [
    "U+0000-00FF",
    "U+0131",
    "U+0152-0153",
    "U+02BB-02BC",
    "U+02C6",
    "U+02DA",
    "U+02DC",
    "U+0304",
    "U+0308",
    "U+0329",
    "U+2000-206F",
    "U+20AC",
    "U+2122",
    "U+2191",
    "U+2193",
    "U+2212",
    "U+2215",
    "U+FEFF",
    "U+FFFD",
  ],
  "latin-ext": [
    "U+0100-02BA",
    "U+02BD-02C5",
    "U+02C7-02CC",
    "U+02CE-02D7",
    "U+02DD-02FF",
    "U+0304",
    "U+0308",
    "U+0329",
    "U+1D00-1DBF",
    "U+1E00-1E9F",
    "U+1EF2-1EFF",
    "U+2020",
    "U+20A0-20AB",
    "U+20AD-20C4",
    "U+2113",
    "U+2C60-2C7F",
    "U+A720-A7FF",
  ],
};

const spaceMonoVariants = SPACE_MONO_WEIGHTS.flatMap((weight) =>
  SPACE_MONO_STYLES.flatMap((style) =>
    Object.entries(GOOGLE_FONTS_SUBSET_RANGES).map(([subset, unicodeRange]) => ({
      weight,
      style,
      unicodeRange,
      src: [
        `${SPACE_MONO_DIRECTORY}/space-mono-${weight}-${style}-${subset}.woff2`,
      ],
    }))
  )
);

/**
 * The site's typefaces, served from the site itself: Space Mono sets the
 * text and Monoton the name in the header. Pages reach them through the CSS
 * variables named here. Each family's files and its SIL Open Font License
 * are in `src/fonts/`.
 */
export const fonts = [
  {
    provider: fontProviders.local(),
    name: "Space Mono",
    cssVariable: "--font-space-mono",
    fallbacks: ["monospace"],
    options: { variants: spaceMonoVariants },
  },
  {
    provider: fontProviders.local(),
    name: "Monoton",
    cssVariable: "--font-monoton",
    fallbacks: ["cursive"],
    options: {
      variants: [
        {
          weight: 400,
          style: "normal",
          src: [`${MONOTON_DIRECTORY}/Monoton-Regular.ttf`],
        },
      ],
    },
  },
];
