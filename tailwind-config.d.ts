declare module "tailwindcss/resolveConfig" {
  interface Theme {
    extend: {
      colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        button: string;
        highlight: string;
        error: string;
        success: string;
        backgroundAccent: string;
      };
    };
  }
}
