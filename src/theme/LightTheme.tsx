import { createMuiTheme } from '@material-ui/core';
import React from 'react';

const LightTheme = createMuiTheme({
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

export default LightTheme;
