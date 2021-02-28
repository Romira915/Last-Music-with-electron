import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RepeatMode } from './audioController';
import { Repeat, RepeatOne } from '@material-ui/icons';

interface Props {
    onClick?: () => void;
    repeatMode: RepeatMode;
}

const RepeatButton: React.FC<Props> = props => {
    const [title, color] = useMemo(() => {
        let title,
            color: 'action' | 'disabled' = 'action';
        switch (props.repeatMode) {
            case RepeatMode.RepeatOff:
                title = 'Repeat all';
                color = 'disabled';
                break;
            case RepeatMode.RepeatAll:
                title = 'Repeat single';
                break;
            case RepeatMode.RepeatSingle:
                title = 'Repeat off';
                break;
        }
        return [title, color];
    }, [props.repeatMode]);

    return (
        <Tooltip title={title}>
            <IconButton edge={'end'} onClick={props.onClick}>
                {props.repeatMode === RepeatMode.RepeatSingle ? (
                    <RepeatOne color={color} />
                ) : (
                    <Repeat color={color} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default RepeatButton;
