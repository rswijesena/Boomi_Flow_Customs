import * as React from 'react';
import { IManywho } from './interfaces';

declare const manywho: IManywho;
declare const moment: any;

const simpleDateTime24 = ({ contentValue }: any) => {
    if (manywho.utils.isNullOrWhitespace(contentValue)) {
        return null;
    }

    const date = moment(contentValue);
    // set options to return datetime in 'MM/DD/YY, HHMM' (24h) format
    const options = {
        // dateStyle: 'short',
        // formatMatcher: 'basic',
        // hour: '2-digit',
        // hour12: false,
        // minute: '2-digit',
        // timeStyle: 'short',
    };

    return <span>{date.toDate().toLocaleString('en-AU', options)}</span>;
};

manywho.component.register('simple-datetime-24', simpleDateTime24);

export default simpleDateTime24;
