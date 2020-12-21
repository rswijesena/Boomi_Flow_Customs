import * as React from 'react';
import { IManywho } from './interfaces';

declare const manywho: IManywho;

const CustomInputSmallTable = ({ contentValue }: any) => {
    if (manywho.utils.isNullOrEmpty(contentValue)) {
        return null;
    }

    return <input type="text" value={contentValue}/>;

};

manywho.component.register('custom-input-smalltable', CustomInputSmallTable, ['CustomInputSmallTable']);

export default CustomInputSmallTable;
