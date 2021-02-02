import React, { useMemo, useCallback } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import {
    StyleIconButton,
    StyleMediaControlPlayOptionGroup,
    StyleMediaControlPrimaryButtonGroup,
} from '../styles/style';
import { Repeat, Shuffle } from '@material-ui/icons';
import RepeatButton from './RepeatButton';
import ShuffleButton from './ShuffleButton';

const MediaControlPlayOption: React.FC = () => {
    return (
        <StyleMediaControlPlayOptionGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <RepeatButton />
                </Grid>
                <Grid item>
                    <ShuffleButton />
                </Grid>
            </Grid>
        </StyleMediaControlPlayOptionGroup>
    );
};

export default MediaControlPlayOption;
