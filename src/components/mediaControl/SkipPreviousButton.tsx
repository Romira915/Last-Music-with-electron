import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

interface Props {
    onClick?: () => void;
}

const SkipPreviousButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Back">
            <IconButton edge={'end'} onClick={props.onClick}>
                <SkipPreviousIcon />
            </IconButton>
        </Tooltip>
    );
};

export default SkipPreviousButton;
