import { GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import { StyleLibraryContents } from '../styles/style';

const img = '../demoalbumart.jpg';
interface Props {
    onClick?: () => void;
}

const LibraryContents: React.FC<Props> = props => {
    return (
        <StyleLibraryContents>
            <GridList cols={4} cellHeight={150} spacing={12}>
                {Array(30)
                    .fill(0)
                    .map((value, index) => {
                        return (
                            <GridListTile key={index}>
                                <img src={img} alt={'demo'} />
                            </GridListTile>
                        );
                    })}
            </GridList>
        </StyleLibraryContents>
    );
};

export default LibraryContents;
