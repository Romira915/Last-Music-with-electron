import { fade, IconButton, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export const StyleIconButton = styled.div`
    ${(props: { theme: Theme }) => css``}
`;

export const StyleMediaSeekBar = styled.div`
    ${(props: { theme: Theme }) => css``}
`;

export const StyleMediaVolumeBar = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 4.5em;
    `}
`;

export const StyleMediaControlPanel = styled.div`
    ${(props: { theme: Theme }) => css`
        white-space: nowrap;
        display: flex;
    `}
`;

export const StyleMediaControlPrimaryButtonGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        min-width: 183px;
        width: 183px;
    `}
`;

export const StyleMediaControlSeekBarGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        flex: 1;
    `}
`;

export const StyleMediaControlVolumeGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        width: 107px;
    `}
`;

export const StyleMediaControlPlayOptionGroup = styled.div`
    ${(props: { theme: Theme }) => css`
        width: 84px;
    `}
`;
