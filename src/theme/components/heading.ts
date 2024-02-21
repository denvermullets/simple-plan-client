import { StyleConfig } from "@chakra-ui/theme-tools";

export const simpleHeading: StyleConfig = {
  baseStyle: {
    color: "black",
  },
  variants: {
    h1: () => ({
      fontSize: "30px",
      fontWeight: "bold",
    }),
    h2: () => ({
      fontSize: "24px",
      fontWeight: "600",
    }),
    h3: () => ({
      fontSize: "18px",
      fontWeight: "600",
    }),
    h4: () => ({
      fontSize: "16px",
      fontWeight: "semi-bold",
    }),
  },
};
