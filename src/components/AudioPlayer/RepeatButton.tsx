import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import RepeatIcon from '@material-ui/icons/Repeat';

interface Props {
    onClick?: () => void;
}

const RepeatButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Loop">
            <IconButton edge={'end'} onClick={props.onClick}>
                <RepeatIcon />
            </IconButton>
        </Tooltip>
    );
};

export default RepeatButton;
