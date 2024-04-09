import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "rgb(245,245,246)",
        backgroundImage:
          "linear-gradient(90deg, rgba(245,245,246,1) 0%, rgba(243,230,245,1) 16%, rgba(109,207,227,1) 100%)",
      },
    },
  },
});

export default Theme;
