import React, { useMemo, useCallback } from 'react';
import { Box, Container, Grid, Slider, Typography } from '@material-ui/core';
import { StyleMediaControlSeekBarGroup } from '../../styles/style';

const MediaControlSeekBar: React.FC = () => {
    return (
        <StyleMediaControlSeekBarGroup>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid
                        container
                        direction={'row'}
                        justify={'space-between'}
                        spacing={1}>
                        <Grid item>
                            <Typography id="MusicTitle">Title</Typography>
                        </Grid>
                        <Grid item>
                            <Typography id="MusicProgress">
                                now / Lenght
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Slider
                        defaultValue={0}
                        aria-label={'MusicProgress'}
                        aria-labelledby="MusicProgress"
                        step={0.1}
                    />
                </Grid>
            </Grid>
        </StyleMediaControlSeekBarGroup>
    );
};

export default MediaControlSeekBar;
