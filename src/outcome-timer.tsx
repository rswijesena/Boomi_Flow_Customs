import * as React from 'react';
import { IComponentProps, IManywho } from './interfaces';
import { ITimerProps, timer } from './timer';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

const onTimerDone = async (props: IComponentProps): Promise<boolean> => {
    const outcomeId = (props.getAttribute('outcome id') || props.getAttribute('refreshOutcomeId')) as string;
    let outcome = null;
    const contentValue = props.getContentValue();
    

    if (!manywho.utils.isNullOrWhitespace(outcomeId) && (contentValue != null && contentValue != 'N/A')) {
        outcome = manywho.model.getOutcome(outcomeId, props.flowKey);

        if (outcome) {
            await manywho.component.onOutcome(outcome, null, props.flowKey);
            return true;
        }
    }

    if (manywho.utils.isNullOrWhitespace(outcomeId) || !outcome) {
        return true;
    }

    return false;
};

const outcomeTimer = (props: ITimerProps) => {
    const contentValue = props.getContentValue();
    const showProgress = (props.getAttribute('show progress') || props.getAttribute('showProgress')) as string;
    const progress =  manywho.utils.isEqual(showProgress, 'true', true) && (contentValue != null && contentValue != 'N/A') ?
        <span className="outcome-timer">Triggering outcome in {props.remaining} seconds</span>
        : null;

    return progress;
};

manywho.component.register('outcome-timer', component(timer(outcomeTimer, onTimerDone)), ['OutcomeTimer', 'outcome_timer']);

export default outcomeTimer;
