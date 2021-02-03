import { contextBridge } from 'electron';
import Api from './api/api';

// 第2引数のオブジェクトが、window オブジェクトに、第1引数の名前で作成される
contextBridge.exposeInMainWorld('api', Api);
