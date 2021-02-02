import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { StyleIconButton } from '../styles/style';

interface IProps {
    onClick?: () => void;
}

const PlayButton: React.FC<IProps> = props => {
    return (
        <StyleIconButton>
            <Tooltip title="Play">
                <IconButton edge={'end'} onClick={props.onClick}>
                    <PlayArrowIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </StyleIconButton>
    );
};

export default PlayButton;
