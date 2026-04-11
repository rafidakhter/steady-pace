import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export const theme = {
  colors,
  radius: {
    none: 0,
    sm: 2
  },
  spacing,
  typography
} as const;
