import { extendTheme, theme as base } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { momentText } from "./components/text";
import { simpleHeading } from "./components/heading";

const customTheme = extendTheme({
  fonts: {
    heading: `Montserrat, ${base.fonts.heading}`,
    body: `Inter, ${base.fonts.body}`,
  },
  components: {
    Text: { ...momentText },
    Heading: { ...simpleHeading },
  },
  ...globalStyles,
});

export default customTheme;
