import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextBox from './TextBox';

// データは、Storeから渡されるので、プロパティは必要ありません。
const UserForm: React.FC = () => {
    // useSelector でステートの変更を受け取れます。
    const dispatch = useDispatch(); // -- (b)
    const onNameChange = useCallback((value: string) => {
        // 名前を変更したとき(タイプするたび)のイベント
    }, []); // [] は初回のみという意味
    const onCountClick = useCallback(() => {
        // 訪問ボタンを押したときのイベント
        // 関数外の変数は、関数が(再)定義されたときのものに固定化されるので、
        // 関数外の変数を使用するときには、下記のように第2引数の配列にそれを指定して、
        // それが変更されたときに再定義されるようにする
    }, [0]);
    return (
        <div>
            <p></p>
        </div>
    );
};

export default UserForm;
