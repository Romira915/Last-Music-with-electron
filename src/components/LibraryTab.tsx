import {
    Tabs,
    Tab,
    AppBar,
    Drawer,
    Button,
    Toolbar,
    Typography,
    Paper,
    Card,
    CardMedia,
    Theme,
} from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { StyleLibraryTabGroup } from '../styles/style';

interface Props {
    onClick?: () => void;
}

const LibraryTab: React.FC<Props> = props => {
    const [value, setValue] = React.useState(0);
    const StyleLibraryTab = styled.div`
        ${(props: { theme: Theme }) => css`
            background-color: ${props.theme.palette.primary.dark};
            flex: 1;
        `}
    `;
    const StyledCardMedia = styled(CardMedia)`
        width: 17em;
        height: 17em;
    `;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyleLibraryTabGroup>
            <StyleLibraryTab>
                <AppBar position={'static'}>
                    <Toolbar>
                        <Button>
                            <Typography variant="h6">ライブラリ</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" color={'transparent'}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="LibraryTab">
                        <Tab label="ミュージック" />
                        <Tab label="プレイリスト" />
                        <Tab label="再生回数トップ" />
                    </Tabs>
                </AppBar>
            </StyleLibraryTab>
            <StyledCardMedia
                title="Album Artwork"
                image="../demoalbumart.jpg"
            />
        </StyleLibraryTabGroup>
    );
};

export default LibraryTab;
