import * as React from 'react';
import { IComponentProps } from './interfaces';
import { component, renderOutcomes } from './utils/wrapper';

const input = ({ model, outcomes, flowKey, onChange, onEvent, getContentValue }: IComponentProps) => (
    <>
        <label>{model.label}</label>
        <input
            type="text"
            value={getContentValue<string>()}
            onChange={onChange}
            onBlur={onEvent}
        />
        {renderOutcomes(outcomes, flowKey)}
    </>
);

export default component(input, true, 'custom-input');
