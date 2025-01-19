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
