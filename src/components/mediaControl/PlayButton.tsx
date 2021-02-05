import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface Props {
    onClick?: () => void;
}

const PlayButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Play">
            <IconButton edge={'end'} onClick={props.onClick}>
                <PlayArrowIcon fontSize={'large'} />
            </IconButton>
        </Tooltip>
    );
};

export default PlayButton;
