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
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction,
    Collapse,
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    LocalMovies,
    MusicNote,
    PlaylistPlay,
} from '@material-ui/icons';
import React from 'react';
import styled, { css } from 'styled-components';
import {
    StyleCardMedia,
    StyleLibraryList,
    StyleLibraryListGroup,
    StyleNestListItem,
} from '../styles/style';

interface Props {
    onClick?: () => void;
}

const LibraryList: React.FC<Props> = props => {
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handlePlaylistListItemClick = () => {
        setOpen(!open);
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <StyleLibraryListGroup>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={event => handleListItemClick(event, -1)}>
                        <Typography variant="h6">ライブラリ</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <StyleLibraryList>
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={event => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <MusicNote />
                    </ListItemIcon>
                    <ListItemText primary="ミュージック" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={event => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <LocalMovies />
                    </ListItemIcon>
                    <ListItemText primary="ムービー" />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText primary="プレイリスト" />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="Expand"
                            onClick={handlePlaylistListItemClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Array(10)
                            .fill(0)
                            .map((_, index) => {
                                return (
                                    <StyleNestListItem button key={index}>
                                        <ListItemText
                                            primary={'なにか' + index}
                                        />
                                    </StyleNestListItem>
                                );
                            })}
                    </List>
                </Collapse>
                <Divider />
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={event => handleListItemClick(event, 3)}>
                    <ListItemText primary="再生回数トップ" />
                </ListItem>
            </StyleLibraryList>
        </StyleLibraryListGroup>
    );
};

export default LibraryList;
