import { createMuiTheme } from '@material-ui/core';

export const ThemeEnum = {
    light: 'light',
    dark: 'dark',
};

export type ThemeEnum = typeof ThemeEnum[keyof typeof ThemeEnum];

export const themeFromEnum = (union: ThemeEnum) => {
    switch (union) {
        case ThemeEnum.light:
            return lightTheme;
        case ThemeEnum.dark:
            return darkTheme;
    }
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
