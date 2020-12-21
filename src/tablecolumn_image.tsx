import * as React from 'react';
import { IManywho } from './interfaces';

declare const manywho: IManywho;

const tableImage = ({ contentValue }: any) => {
    if (manywho.utils.isNullOrEmpty(contentValue)) {
        return null;
    }
    const type = contentValue.substring('data:image/'.length, contentValue.indexOf(';base64'));
    if (type === 'jpeg' || type === 'png' || type === 'gif'){
        return  <img src={contentValue} width="50" height="50"/>;
    }else {
        return  <img src="https://files-manywho-com.s3.amazonaws.com/e9feb34a-6be3-4e99-b478-78634c5fe065/logo.png" width="50" height="50"/>;
    }
};

manywho.component.register('tableImage', tableImage, ['tableImage']);

export default tableImage;
