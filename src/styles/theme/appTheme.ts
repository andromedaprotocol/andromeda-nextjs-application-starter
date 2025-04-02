import { COLORS } from "@andromeda/design-tokens/colors";
import { RADIUS } from "@andromeda/design-tokens/radius";
import { SIZES } from "@andromeda/design-tokens/sizes";
import { SPACING } from "@andromeda/design-tokens/spacing";
import { TYPOGRAPHY } from "@andromeda/design-tokens/typography";

export const APP_THEMES = {
  dark: "dark",
  light: "light",
};

export type AppTheme = keyof typeof APP_THEMES;

export const appTheme = {
  colors: {
    ...COLORS.colors,
    border: {
      DEFAULT: "#958d8d",
      ...COLORS.colors.border,
    },
    input: "#ffffff3d",
    ring: "#63b3ed",
    background: {
      DEFAULT: "#101216",
      ...COLORS.colors.background,
    },
    foreground: "#E0E0E1",
    primary: {
      ...COLORS.colors.primary,
      DEFAULT: "#4481FF",
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#1C1E22",
      foreground: "#E0E0E1",
    },
    destructive: {
      DEFAULT: "#FE394C",
      foreground: "#FFFFFF",
    },
    muted: {
      DEFAULT: "#2D2E32",
      foreground: "#E0E0E1",
    },
    accent: {
      DEFAULT: "#f5f4f0",
      foreground: "black",
    },
    popover: {
      DEFAULT: "#1C1E22",
      foreground: "#E0E0E1",
    },
    card: {
      DEFAULT: "#1C1E22",
      foreground: "#E0E0E1",
    },
  },
  screens: {
    ...SIZES.container,
  },
  spacing: {
    ...SPACING.spacing,
  },
  fontFamily: {
    ...TYPOGRAPHY.fontFamilies,
  },
  borderRadius: {
    ...RADIUS.raddi,
  },
  fontSize: Object.keys(TYPOGRAPHY.textStyles).reduce(
    (acc, key) => {
      const textStyle =
        TYPOGRAPHY.textStyles[key as keyof typeof TYPOGRAPHY.textStyles];
      acc[key] = [
        textStyle.fontSize,
        {
          ...textStyle,
        },
      ];
      return acc;
    },
    {} as Record<
      string,
      [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>,
      ]
    >,
  ),
}; 