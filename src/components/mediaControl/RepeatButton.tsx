import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { StyleIconButton } from '../../styles/style';
import RepeatIcon from '@material-ui/icons/Repeat';

interface Props {
    onClick?: () => void;
}

const RepeatButton: React.FC<Props> = props => {
    return (
        <StyleIconButton>
            <Tooltip title="Loop">
                <IconButton edge={'end'} onClick={props.onClick}>
                    <RepeatIcon />
                </IconButton>
            </Tooltip>
        </StyleIconButton>
    );
};

export default RepeatButton;
