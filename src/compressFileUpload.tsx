import * as React from 'react';
import Resizer from 'react-image-file-resizer';
import './css/basic.css';
import { IComponentProps, IManywho } from './interfaces';

class CompressFileUpload extends React.Component<IComponentProps, { imgURL: any }> {

    constructor(props: IComponentProps) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.state = {
            imgURL: '',
        };
    }

    fileChangedHandler(event: any) {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                (uri: any) => {
                    this.setState({
                        imgURL: uri,
                    });
                    console.log(uri);
                },
                'base64,',
            );
        }
    }

    render() {
        return (
            <div className="App">
                <input type="file" onChange={this.fileChangedHandler} />
                <img src={this.state.imgURL} />
            </div>
        );
    }
}

manywho.component.register('compress-file-upload', CompressFileUpload);

export default CompressFileUpload;
