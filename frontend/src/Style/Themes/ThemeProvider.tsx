// ThemeProvider.tsx
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {ReactNode} from "react";

interface ThemeProviderProps {
    theme: object;
    children: ReactNode;
}

export default function ThemeProvider({ children, theme }: ThemeProviderProps) {
    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
