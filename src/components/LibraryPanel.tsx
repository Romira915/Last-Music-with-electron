import React from 'react';
import {
    StyleLibraryContentsWrapper,
    StyleLibraryPanel,
} from '../styles/style';
import LibraryContents from './LibraryContents';
import LibraryList from './LibraryList';

interface Props {
    onClick?: () => void;
}

const LibraryPanel: React.FC<Props> = props => {
    return (
        <StyleLibraryPanel>
            <LibraryList />
            <StyleLibraryContentsWrapper>
                <LibraryContents />
            </StyleLibraryContentsWrapper>
        </StyleLibraryPanel>
    );
};

export default LibraryPanel;
