import * as React from 'react';
import { triggerBase64Download } from 'react-base64-downloader';
import { IManywho } from './interfaces';

declare const manywho: IManywho;
declare const moment: any;

const downloadImage = ({ contentValue }: any) => {
    if (manywho.utils.isNullOrWhitespace(contentValue)) {
        return null;
    }
    return (
       <div>
            <a className="btn btn-info" download="tempname" href={contentValue} title="Download file">Download</a>
        </div>
    );
};

manywho.component.register('download-image', downloadImage);

export default downloadImage;
