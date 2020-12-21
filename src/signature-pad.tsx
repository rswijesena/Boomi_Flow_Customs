/// <reference path="./declarations.d.ts" />
import * as React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './css/signature-pad.css';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

interface ISignaturePadState {
    isVisible: boolean;
}

class SignaturePad extends React.Component<IComponentProps, ISignaturePadState> {
    canvas: any;

    constructor(props: IComponentProps) {
        super(props);

        this.state = {
            isVisible: true,
        };
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        if (this.state.isVisible !== this.props.model.isVisible) {
            this.setState({
                isVisible: this.props.model.isVisible,
            }, this.updateCanvas);
        }
    }

    updateCanvas = () => {
        if (this.state.isVisible) {
            const contentValue = this.props.getContentValue() as string;
            if (contentValue) {
                this.canvas.fromDataURL(contentValue);
            }
        }
    }

    onClear = () => {
        this.canvas.clear();
        this.props.onChange(null);
    }

    onEnd = () => {
        this.props.onChange(this.canvas.toDataURL());
    }

    render() {
        if (!this.state.isVisible) {
            return null;
        }

        const canvasProps: any = {
            height: `100px`,
            width: `250px`,
        };

        const title = this.props.getAttribute('title') || 'Signature - please draw your signature in the area below';

        return (
            <div className="signature-box">
                <div className="signature-box-header">
                    <label>{title}</label>

                </div>
                <SignatureCanvas
                    penColor="#000000"
                    onEnd={this.onEnd}
                    redrawOnResize={true}
                    canvasProps={canvasProps}
                    ref={(ref: any) => { this.canvas = ref; }}
                />
                <div className="signature-box-header">
                    <button className="btn btn-default btn-sm" onClick={this.onClear}>
                        <span className="glyphicon glyphicon-remove" />
                        Clear
                    </button>
                </div>
                <div>{this.props.outcomes}</div>
            </div>
        );
    }
}

manywho.component.register('signature-pad', component(SignaturePad), ['SignaturePad', 'signature_pad']);

export default SignaturePad;
