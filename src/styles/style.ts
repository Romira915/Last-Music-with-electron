import {
    CardMedia,
    fade,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
    Theme,
} from '@material-ui/core';
import styled, { css } from 'styled-components';

const contentsSpacing = '4px';
const librarylistWidth = '17em';

export const StyleApp = styled.div`
    ${(props: { theme: Theme }) => css`
        height: 100%;
        min-height: 100vh;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
    `}
`;

export const StyleAudioVolumeBar = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 4.5em;
    `}
`;

export const StyleAudioPlayerPanel = styled(Paper)`
    ${(props: { theme: Theme }) => css`
        display: flex;
        align-items: center;
        margin-bottom: ${contentsSpacing};
    `}
`;

export const StyleAudioPlayerPrimaryButtonGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 183px;
    `}
`;

export const StyleAudioPlayerSeekBarGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        flex: 1;
        min-width: 140px;
    `}
`;

export const StyleAudioPlayerVolumeGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 107px;
    `}
`;

export const StyleAudioPlayerPlayOptionGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 84px;
    `}
`;

export const StyleTransparency = styled.div`
    ${(props: { theme: Theme }) => css`
        opacity: 0.25;
    `}
`;

export const StyleLibraryListGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        width: ${librarylistWidth};
        min-width: ${librarylistWidth};
        max-width: ${librarylistWidth};
        display: flex;
        flex-direction: column;
        flex: 1;
    `}
`;

export const StyleLibraryList = styled(List)`
    ${(props: { theme: Theme }) => css`
        background-color: ${props.theme.palette.primary.light};
        flex: 1 0 12em;
        overflow: auto;
    `}
`;

export const StyleNestListItem = styled(ListItem)`
    ${(props: { theme: Theme }) => css`
        padding-left: ${props.theme.spacing(8)}px;
    `}
`;

export const StyleCardMedia = styled(CardMedia)`
    ${(props: { theme: Theme }) => css`
        margin-top: ${contentsSpacing};
        width: ${librarylistWidth};
        height: ${librarylistWidth};
    `}
`;

export const StyleLibraryPanel = styled.div`
    ${(props: { theme: Theme }) => css`
        display: flex;
        flex: 1;
    `}
`;

export const StyleLibraryContentsWrapper = styled.div`
    ${(props: { theme: Theme }) => css`
        overflow-y: scroll;
        min-height: 5em;
        margin-left: ${contentsSpacing};
    `}
`;

export const StyleLibraryContents = styled.div`
    ${(props: { theme: Theme }) => css`
        height: 0;
    `}
`;
