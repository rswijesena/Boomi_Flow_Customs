import * as React from 'react';

class DownloadPDF extends React.Component {
    onPrint = () => {
        window.print();
    }
    render() {

        return (
            <div>
                <button onClick={this.onPrint}>Save as a PDF</button>
            </div>
        );

    }
}

manywho.component.register('download-pdf', DownloadPDF);

export default DownloadPDF;
