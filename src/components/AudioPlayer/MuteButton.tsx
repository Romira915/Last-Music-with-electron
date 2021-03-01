import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
    VolumeDown,
    VolumeMute,
    VolumeOff,
    VolumeUp,
} from '@material-ui/icons';

interface Props {
    isMuted: boolean;
    volumeLevel: 0 | 1 | 2;
    onClick?: () => void;
}

const MuteButton: React.FC<Props> = props => {
    const title = useMemo(() => {
        if (props.isMuted) {
            return 'Mute Off';
        } else {
            return 'Mute On';
        }
    }, [props.isMuted]);

    const Icon = useMemo(() => {
        if (props.isMuted) {
            return VolumeOff;
        } else {
            switch (props.volumeLevel) {
                case 0:
                    return VolumeMute;
                case 1:
                    return VolumeDown;
                case 2:
                    return VolumeUp;
            }
        }
    }, [props.isMuted, props.volumeLevel]);

    return (
        <Tooltip title={title}>
            <IconButton onClick={props.onClick}>
                <Icon fontSize={'small'} />
            </IconButton>
        </Tooltip>
    );
};

export default MuteButton;
