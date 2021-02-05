import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
    onClick?: () => void;
}

const StopButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Stop">
            <IconButton edge={'end'} onClick={props.onClick}>
                <StopIcon />
            </IconButton>
        </Tooltip>
    );
};

export default StopButton;
