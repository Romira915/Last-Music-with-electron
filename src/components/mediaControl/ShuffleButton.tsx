import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { StyleIconButton } from '../../styles/style';
import ShuffleIcon from '@material-ui/icons/Shuffle';

interface Props {
    onClick?: () => void;
}

const ShuffleButton: React.FC<Props> = props => {
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
