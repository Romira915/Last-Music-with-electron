import { GridList, GridListTile } from '@material-ui/core';
import React from 'react';

interface Props {
    onClick?: () => void;
}

const LibraryContents: React.FC<Props> = props => {
    return (
        <GridList>
            <GridListTile></GridListTile>
        </GridList>
    );
};

export default LibraryContents;
