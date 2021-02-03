import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import { StyleIconButton } from '../../styles/style';

interface Props {
    onClick?: () => void;
}

const StopButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Stop">
            <StyleIconButton>
                <IconButton edge={'end'} onClick={props.onClick}>
                    <StopIcon />
                </IconButton>
            </StyleIconButton>
        </Tooltip>
    );
};

export default StopButton;
