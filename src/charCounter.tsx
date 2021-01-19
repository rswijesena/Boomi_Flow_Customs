import * as React from 'react';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;
interface IInputTextAreaState {
    textAreaValue: string;
    charLimit: number;
}

class CharCounter extends React.Component<IComponentProps, IInputTextAreaState> {

    constructor(props: any) {
        super(props);
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        this.props.model.maxSize = 255;
        this.props.model.height = model.height;
        this.props.model.width = model.width;
        this.props.model.id = model.id;

        const value = this.props.getContentValue() as string;
        if (value){
            this.state = {
                textAreaValue : value,
                charLimit : 255,
            };
        } else {
            this.state = {
                textAreaValue : '',
                charLimit : 255,
            };
        }

    }

    onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({ textAreaValue: e.currentTarget.value as string });
        this.props.onChange(e.currentTarget.value);


        const maxCharacters = 255;
        const currentText = e.currentTarget.value;
        const characterCount = currentText.length;

        const remainingcount = maxCharacters - characterCount;
        const inputElement: HTMLInputElement = document.getElementById(this.props.model.id) as HTMLInputElement;

        inputElement.value = remainingcount.toString();

    }

    onBlur = () => {
       //this.props.onEvent();
    }

    render() {

        return (
            /*
            <span>Hello World</span>
            */
            <div>

            <textarea
                placeholder="Enter some text"
                onChange={this.onChange}
                maxLength={255}
                rows={this.props.model.height}
                cols={this.props.model.width}
                value={this.props.getContentValue<string>()}
            />
            <br />
            {/* Max Characters : <input id={this.props.model.id} value={this.props.model.maxSize} readOnly={true} /> */}
            <h2>Remaining Characters: {this.state.charLimit - this.state.textAreaValue.length}</h2>
         </div>
        );
    }

}

manywho.component.register('char-counter', component(CharCounter, true));
// manywho.component.register('custom-input', component(CustomInput, true));

export default CharCounter;
