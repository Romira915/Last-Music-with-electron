import React, { useCallback, useMemo, useState } from 'react';
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
import {} from './api/api';
import MediaControlPanel from './components/mediaControl/MediaControl';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryList from './components/LibraryList';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StyleApp, StyleCardMedia } from './styles/style';
import LibraryPanel from './components/LibraryPanel';
import store, { RootState, useAppDispatch } from './store';
import { changeTheme, counter, Settings } from './slice/settingsSlice';
import { darkTheme, lightTheme, ThemeEnum, themeFromEnum } from './theme/Theme';

const container = document.getElementById('app');

const show = () => {
    window.Api.hello();
    console.log('Button Click');
};

const App: React.FC = props => {
    const dispatch = useAppDispatch();
    const themeEnum = useSelector<RootState, Settings>(state => state.settings)
        .theme;
    const theme = useMemo(() => themeFromEnum(themeEnum), [themeEnum]);

    const onThemeChange = useCallback(() => {
        dispatch(
            changeTheme(
                themeEnum === ThemeEnum.light
                    ? ThemeEnum.dark
                    : ThemeEnum.light,
            ),
        );
    }, [themeEnum]);

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
    <Provider store={store}>
        <App>
            <MediaControlPanel />

            <LibraryPanel />
        </App>
    </Provider>,
    container,
);
