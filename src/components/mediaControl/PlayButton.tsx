import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { StyleIconButton } from '../../styles/style';

interface Props {
    onClick?: () => void;
}

const PlayButton: React.FC<Props> = props => {
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
