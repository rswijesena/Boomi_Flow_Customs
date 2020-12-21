import * as React from 'react';
import { IComponentProps, IManywho } from './interfaces';

declare const manywho: IManywho;

export interface ITimerProps extends IComponentProps {
    remaining: number;
}

export const timer = (WrappedComponent: any, onTimerDone: (props: IComponentProps) => Promise<boolean>) => {
    return class extends React.Component<IComponentProps, any> {
        remaining: number;
        timer: number;

        startTimer = () => {
            const interval = (this.props.getAttribute('wait') || this.props.getAttribute('refreshIntervalSeconds')) as string;
            this.remaining = manywho.utils.isNullOrWhitespace(interval) ? 10 : parseInt(interval, 10);

            this.timer = setInterval(this.onTimer, 1000) as any;
            this.forceUpdate();
        }

        restartTimer = () => {
            const repeat = this.props.getAttribute('repeat') as string;
            if (manywho.utils.isEqual(repeat, 'true', true)) {
                this.startTimer();
            }
        }

        onTimer = async () => {
            if (this.remaining > 0) {
                this.remaining--;
                this.forceUpdate();
            } else {
                clearInterval(this.timer);
                this.timer = null;

                const shoudRestart = await onTimerDone(this.props);
                if (shoudRestart) {
                    this.restartTimer();
                }
            }
        }

        componentDidMount() {
            this.startTimer();
        }

        componentWillUnmount() {
            clearInterval(this.timer);
        }

        render() {
            return <WrappedComponent {...this.props} remaining={this.remaining} />;
        }
    };
};
