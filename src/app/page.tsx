"use client";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    margin: 0;
    padding: 0;
    background: url('/bg.jpg') no-repeat center center fixed;
    background-size: cover;
    font-family: 'ms_sans_serif';
    min-height: 100vh;
  }
`;

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
