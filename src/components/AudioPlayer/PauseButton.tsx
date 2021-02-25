import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Pause } from '@material-ui/icons';

interface Props {
    onClick?: () => void;
}

const PauseButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Pause">
            <IconButton edge={'end'} onClick={props.onClick}>
                <Pause fontSize={'large'} />
            </IconButton>
        </Tooltip>
    );
};

export default PauseButton;
