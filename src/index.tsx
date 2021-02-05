import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Paper,
    Typography,
    makeStyles,
    Theme,
    Button,
    Slider,
    IconButton,
    Box,
    Container,
    Grid,
    CssBaseline,
    ButtonGroup,
    Checkbox,
    AppBar,
    Toolbar,
    Tabs,
    Tab,
} from '@material-ui/core';
import {
    createMuiTheme,
    ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Store from './Store';
import {} from './api/api';
import Settings from './states/settings';
import { State } from './states/state';
import { changeSettingsAction } from './actions/settingsActions';
import DarkTheme from './theme/DarkTheme';
import LightTheme from './theme/LightTheme';
import MediaControlPanel from './components/mediaControl/MediaControl';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryList from './components/LibraryList';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StyleApp, StyleCardMedia } from './styles/style';

const container = document.getElementById('app');

const show = () => {
    window.api.hello();
    console.log('Button Click');
};

const App: React.FC = props => {
    const { theme } = useSelector<State, Settings>(a => a.settings);
    const dispatch = useDispatch();

    const onThemeChange = useCallback(() => {
        dispatch(
            changeSettingsAction({
                theme: theme === LightTheme ? DarkTheme : LightTheme,
            }),
        );
    }, [theme]);

    return (
        <MaterialThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline>
                    <StyleApp>
                        <Button onClick={onThemeChange}>ダークモード</Button>
                        {props.children}
                    </StyleApp>
                </CssBaseline>
            </StyledThemeProvider>
        </MaterialThemeProvider>
    );
};

ReactDOM.render(
    <Provider store={Store}>
        <App>
            <MediaControlPanel />

            <LibraryList />

            <StyleCardMedia title="Album Artwork" image="../demoalbumart.jpg" />
        </App>
    </Provider>,
    container,
);
