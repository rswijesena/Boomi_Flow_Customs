import * as React from 'react';
import './css/table-small.css';

declare const manywho: any;

const checkRowIsSelected = (selectedRow: { externalId: any; internalId: any; }, row: { externalId: any; internalId: any; }) => {
    const rowSelectedOnClientSide = selectedRow.externalId || selectedRow.internalId;
    const rowSelectedOnServerSide = row.externalId || row.internalId;
    return rowSelectedOnServerSide === rowSelectedOnClientSide;
};

class TableSmall extends React.Component<any, null> {

    onOutcomeClick = (e: { target: any; }, outcome: { id: any; }) => {
        const objectDataId = $(e.target).closest('[data-item]').attr('data-item');
        this.props.onOutcome(objectDataId, outcome.id);
    }

    renderRows = (objectData: any[], outcomes: any[], displayColumns: any[]) => {
        return objectData.map((item) => {

            const classNames = ['list-group-item', 'clearfix'];
            const isSelected = this.props.selectedRows.filter((row: { externalId: any; internalId: any; }) => checkRowIsSelected(row, item)).length > 0;

            if (isSelected) {
                classNames.push('active');
            }

            const attributes = {
                'className': classNames.join(' '),
                'data-item': item.internalId,
                'id': item.internalId,

            };

            return (
                <li {...attributes} key={item.internalId}>
                    <table className="table table-small-item">
                        <tbody>
                            {displayColumns.map((column) => {
                                let selectedProperty = item.properties.filter(
                                    (property: { typeElementPropertyId: any; }) => property.typeElementPropertyId === column.typeElementPropertyId,
                                )[0];

                                if (!manywho.utils.isNullOrWhitespace(column.typeElementPropertyToDisplayId)) {
                                    if (selectedProperty != null &&
                                        selectedProperty.objectData != null) {
                                        selectedProperty = selectedProperty.objectData[0].properties.filter(
                                            (childProperty: { typeElementPropertyId: any; }) => {
                                                return childProperty.typeElementPropertyId === column.typeElementPropertyToDisplayId;
                                            })[0];
                                    }
                                }

                                if (selectedProperty) {

                                    let element = (
                                        <span>
                                            {manywho.formatting.format(
                                                selectedProperty.contentValue,
                                                selectedProperty.contentFormat,
                                                selectedProperty.contentType,
                                                this.props.flowKey,
                                            )}
                                        </span>
                                    );

                                    if (this.props.isFiles &&
                                        (manywho.utils.isEqual(
                                            selectedProperty.typeElementPropertyId,
                                            manywho.settings.global(
                                                'files.downloadUriPropertyId',
                                            ),
                                            true,
                                        )
                                        || manywho.utils.isEqual(
                                            selectedProperty.developerName,
                                            manywho.settings.global(
                                                'files.downloadUriPropertyName',
                                            ),
                                            true,
                                        ))
                                    ) {
                                        element = (
                                            <a
                                                href={selectedProperty.contentValue}
                                                className="btn btn-info"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Download
                                            </a>
                                        );
                                    }

                                    if (column.componentType) {
                                        element = React.createElement(
                                            manywho.component.getByName(column.componentType),
                                            {
                                                contentFormat: column.contentFormat,
                                                contentType: column.contentType,
                                                contentValue: selectedProperty.contentValue,
                                                flowKey: this.props.flowKey,
                                                id: item.internalId,
                                                isEditable: column.isEditable,
                                                objectData: selectedProperty.objectData,
                                                onCommitted: null,
                                                propertyId: column.typeElementPropertyId,
                                            },
                                        );
                                    }

                                    return (
                                        <tr key={selectedProperty.developerName}>
                                            <th className="table-small-column table-small-label">
                                                {column.label}
                                            </th>
                                            <td className="table-small-column">{element}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                    <div className="table-small-outcomes">
                        {
                            outcomes.map(
                                (outcome) => React.createElement(manywho.component.getByName('outcome'), {
                                    flowKey: this.props.flowKey,
                                    id: outcome.id,
                                    key: outcome.id,
                                    onClick: this.onOutcomeClick,
                                }),
                            )
                        }
                    </div>
                </li>
            );
        });
    }

    render() {
        manywho.log.info('Rendering Table-Small');

        const classNames = [
            'list-group',
            (this.props.isValid) ? '' : 'table-invalid',
        ].join(' ');

        const items = this.renderRows(
            this.props.objectData || [],
            this.props.outcomes,
            this.props.displayColumns,
        );

        return (
            <ul className={classNames}>
                {items}
            </ul>
        );
    }
}

manywho.component.register('mw-table-small', TableSmall);

export default TableSmall;
