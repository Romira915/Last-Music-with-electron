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
import AudioPlayerPanel from './components/AudioPlayer/AudioPlayer';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryList from './components/LibraryList';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StyleApp, StyleCardMedia } from './styles/style';
import LibraryPanel from './components/LibraryPanel';
import store, { persistor, RootState, useAppDispatch } from './store';
import {
    changeTheme,
    GeneralSettings,
} from './slice/settings/generalSettingsSlice';
import { darkTheme, lightTheme, ThemeEnum, themeFromEnum } from './theme/Theme';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('app');

const show = () => {
    window.Api.hello();
    console.log('Button Click');
};

const App: React.FC = props => {
    const dispatch = useAppDispatch();
    const themeEnum = useSelector<RootState, GeneralSettings>(
        state => state.settings.generalSettings,
    ).theme;
    const theme = useMemo(() => themeFromEnum(themeEnum), [themeEnum]);

    const onThemeChange = useCallback(() => {
        dispatch(
            changeTheme(
                themeEnum === ThemeEnum.Light
                    ? ThemeEnum.Dark
                    : ThemeEnum.Light,
            ),
        );
    }, [themeEnum]);

    return (
        <MaterialThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <CssBaseline>
                    <StyleApp>
                        <Button onClick={onThemeChange}>
                            ダークモード (撤去予定)
                        </Button>
                        {props.children}
                    </StyleApp>
                </CssBaseline>
            </StyledThemeProvider>
        </MaterialThemeProvider>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App>
                <AudioPlayerPanel />

                <LibraryPanel />
            </App>
        </PersistGate>
    </Provider>,
    container,
);
