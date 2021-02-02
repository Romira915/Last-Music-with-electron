import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { StyleIconButton } from '../styles/style';
import ShuffleIcon from '@material-ui/icons/Shuffle';

interface IProps {
    onClick?: () => void;
}

const ShuffleButton: React.FC<IProps> = props => {
    return (
        <StyleIconButton>
            <Tooltip title="Shuffle">
                <IconButton onClick={props.onClick}>
                    <ShuffleIcon />
                </IconButton>
            </Tooltip>
        </StyleIconButton>
    );
};

export default ShuffleButton;
