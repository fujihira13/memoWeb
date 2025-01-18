import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      background: {
        card: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
  }
}

export const theme: Theme = {
  colors: {
    primary: "#0891b2",
    background: {
      card: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#666666",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
};
