import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/normalize.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styledComponentsRhythm from '../libs/styledComponentRhythm';
import { useWindowSize } from '../libs/useWindowResize';
import { media, size } from '../styles/media';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpointValues = {
    xs: size.xsmall,
    sm: size.small,
    md: size.medium,
    lg: size.large,
    xl: size.xlarge
};

const capHeights = {
    // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
    Muli: 0.715,
    'Fira Code': 0.69,
    'Fjalla One': 0.87,
    Lato: 0.72
};

const rhythmThemes = {
    mobile: styledComponentsRhythm({
        baseFontSize: 1.2, // rem units.
        defaultLineHeight: 1.5, // unitless line-height
        rhythmHeight: 0.8, // rem units.
        capHeights: capHeights,
        debug: false
    }),
    laptop: styledComponentsRhythm({
        baseFontSize: 1, // rem units.
        defaultLineHeight: 1.6, // unitless line-height
        rhythmHeight: 0.8, // rem units.
        capHeights: capHeights,
        debug: false
    }),
    desktop: styledComponentsRhythm({
        baseFontSize: 1, // rem units.
        defaultLineHeight: 1.6, // unitless line-height
        rhythmHeight: 0.8, // rem units.
        capHeights: capHeights,
        debug: false
    })
};

const GlobalStyle = createGlobalStyle`
  ${rhythmThemes.mobile.global};
  ${media.small} {
    ${rhythmThemes.laptop.global};
  }
  ${media.large} {
    ${rhythmThemes.desktop.global};
  }
`;

const App = ({ Component, pageProps }) => {
    const windowSize = useWindowSize();

    const getRhythmTheme = () => {
        const width = windowSize.width;
        if (width < size.small) {
            return rhythmThemes.mobile;
        } else if (width >= size.small && width < size.large) {
            return rhythmThemes.laptop;
        } else {
            return rhythmThemes.desktop;
        }
    };
    let rhythm = getRhythmTheme();
    const spacing =
        windowSize.width < size.large
            ? rhythm.theme.rhythmHeight
            : rhythm.theme.rhythmHeight * 2;

    const material = createMuiTheme({
        breakpoints: {
            values: breakpointValues
        },
        spacing: (factor) => `${factor * spacing}rem`,
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#2F2D2E'
            },
            secondary: {
                // Blue-grey
                main: '#e7e7e9;'
            }
        }
    });

    // #464953
    //#2c2d33;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <MuiThemeProvider theme={material}>
            <ThemeProvider theme={rhythm.theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </MuiThemeProvider>
    );
};

export default App;
