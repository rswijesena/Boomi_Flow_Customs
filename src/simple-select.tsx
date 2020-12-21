import * as React from 'react';
import { IComponentProps, IManywho, IObjectData } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

class SimpleSelect extends React.Component<IComponentProps, any> {

    constructor(props: IComponentProps) {
        super(props);
    }

    onSelect = (e: React.FormEvent<HTMLSelectElement>) => {
        this.props.onSelect(e.currentTarget.value, false, true);
        this.forceUpdate();
    }

    getOptions(objectData: IObjectData[]) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const columns = manywho.component.getDisplayColumns(model.columns);

        if (columns && columns.length > 0) {
            const columnTypeElementPropertyId = columns[0].typeElementPropertyId;
            const columnTypeElementPropertyIdIsDisabled = columns[1].typeElementPropertyId;

            return objectData.map((item) => {

                const labelProperty = item.properties.find((value) => {
                    return manywho.utils.isEqual(
                        value.typeElementPropertyId,
                        columnTypeElementPropertyId,
                        true,
                    );
                });

                if (!labelProperty) {
                    manywho.log.error(
                        `columnTypeElementPropertyId ${columnTypeElementPropertyId} cannot be found in objectData item:`,
                        item,
                    );
                }

                const optionText = labelProperty
                    ? manywho.formatting.format(
                        labelProperty.contentValue as string,
                        labelProperty.contentFormat,
                        labelProperty.contentType,
                        this.props.flowKey,
                    )
                    : '';

                    /////////////

                const isDisabledlabelProperty = item.properties.find((value) => {
                        return manywho.utils.isEqual(
                            value.typeElementPropertyId,
                            columnTypeElementPropertyIdIsDisabled,
                            true,
                        );
                    });

                if (!isDisabledlabelProperty) {
                        manywho.log.error(
                            `columnTypeElementPropertyId ${columnTypeElementPropertyIdIsDisabled} cannot be found in objectData item:`,
                            item,
                        );
                    }

                const isDisabledoptionText = isDisabledlabelProperty
                        ? manywho.formatting.format(
                            isDisabledlabelProperty.contentValue as string,
                            isDisabledlabelProperty.contentFormat,
                            isDisabledlabelProperty.contentType,
                            this.props.flowKey,
                        )
                        : '';

                const stringValue = isDisabledoptionText;

                const boolValue = (stringValue == 'true');

                return {
                    label: optionText,
                    value: item.externalId,
                    isDisabled: boolValue,
                };
            });
        }

        return [];
    }

    render() {
        let className = manywho.styling.getClasses(
            this.props.parentId,
            this.props.id,
            'select',
            this.props.flowKey,
        ).join(' ');

        className += ' form-group';

        if (this.props.model.isVisible === false) {
            className += ' hidden';
        }

        if (this.props.model.isValid === false || this.props.state.isValid === false || this.props.state.error) {
            className += ' has-error';
        }

        const options = [<option  key="none" value="">{this.props.model.hintValue}</option>].concat(
            this.getOptions(this.props.getObjectData(this.props.model)).map((option) => <option disabled={option.isDisabled} value={option.value} key={option.value}>{option.label}</option>),
        );

        let value = null;
        if (this.props.state.objectData && this.props.state.objectData.length > 0) {
            value = this.props.state.objectData[0].externalId;
        }

        return (
            <div className={className} id={this.props.id}>
                <label>{this.props.model.label}{this.props.model.isRequired ? <span className="input-required"> *</span> : null}</label>
                <div>
                    <select
                        className="form-control"
                        value={value}
                        onChange={this.onSelect}
                    >
                        {options}
                    </select>
                </div>
                <span className="help-block">{this.props.model.validationMessage || this.props.state.validationMessage}</span>
                <span className="help-block">{this.props.model.helpInfo}</span>
            </div>
        );
    }
}

manywho.component.register('simple-select', component(SimpleSelect, true));

export default SimpleSelect;
