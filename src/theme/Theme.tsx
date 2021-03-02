import { createMuiTheme, Theme } from '@material-ui/core';

export const ThemeEnum = {
    Light: 'Light',
    Dark: 'Dark',
};

export type ThemeEnum = typeof ThemeEnum[keyof typeof ThemeEnum];

export const themeFromEnum = (union: ThemeEnum) => {
    let theme: Theme = lightTheme;
    switch (union) {
        case ThemeEnum.Light:
            theme = lightTheme;
            break;
        case ThemeEnum.Dark:
            theme = darkTheme;
            break;
    }
    return theme;
};

export const lightTheme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
        fontSize: 14,
        fontFamily: [
            'Noto Sans JP',
            'sans-serif',
            'Noto Serif JP',
            'serif',
        ].join(','),
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
        },
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#CB4BEB',
        },
        type: 'dark',
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontSize: 14,
        fontFamily: [
            'Noto Sans JP',
            'sans-serif',
            'Noto Serif JP',
            'serif',
        ].join(','),
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
        },
    },
});
