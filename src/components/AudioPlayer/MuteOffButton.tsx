import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { VolumeOff } from '@material-ui/icons';

interface Props {
    onClick?: () => void;
}

const MuteOffButton: React.FC<Props> = props => {
    return (
        <Tooltip title="Mute Off">
            <IconButton onClick={props.onClick}>
                <VolumeOff fontSize={'small'} />
            </IconButton>
        </Tooltip>
    );
};

export default MuteOffButton;
