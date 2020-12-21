/// <reference path="./declarationsnew.d.ts" />
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Resizer from 'react-image-file-resizer';
import './css/file-base64.css';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

const fileBase64 =  (props: IComponentProps) => {
    const [file, setFile] = React.useState('');
    const [preview = null, setFilePreview] = React.useState('');
    const [type, setFileType] = React.useState('');
    const fileNameComponentID = props.getAttribute('file_name_hidden_id') as string;
    const fileTypeHiddenId = props.getAttribute('file_type_hidden_id') as string;
    const onDrop = React.useCallback((files) => {
        setFile(files[0].name);
        setFileType(files[0].type);
        setFilePreview(URL.createObjectURL(files[0]));
        const stateFileName = manywho.state.getComponent(fileNameComponentID, props.flowKey);
        stateFileName.contentValue = files[0].name;
        const stateFileType = manywho.state.getComponent(fileTypeHiddenId, props.flowKey);
        stateFileType.contentValue = files[0].type;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png' || files[0].type === 'image/bmp') {
            Resizer.imageFileResizer(
                files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                (uri: any) => {
                    props.onChange(uri as string, true, false);
                },
                'base64,',
            );
        } else {
            reader.onload = () => props.onChange(reader.result as string, true, false);
        }
        // reader.onload = () => props.onChange(compress as string, true, false);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const label = <label>{props.model.label}{props.model.isRequired ? <span className="input-required"> *</span> : null}</label>;
    const hint = manywho.utils.isNullOrEmpty(props.model.hintValue) ? manywho.settings.global('localization.fileUploadMessage', props.flowKey) : props.model.hintValue;

    return (
        <div className={props.className.join(' ')}>
            {label}
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {!manywho.utils.isNullOrEmpty(file) ? <p><strong>{file}</strong></p> : null}
                <p>{hint}</p>
                {/* <p>{type}</p> */}
                {/* {!manywho.utils.isNullOrEmpty(file) ? <img width="100px" height="100px" src={preview} /> : null} */}
            </div>
            <span className="help-block">{props.model.validationMessage || props.state.validationMessage}</span>
            <span className="help-block">{props.model.helpInfo}</span>
        </div>
    );
};

manywho.component.register('file-base64', component(fileBase64));

export default fileBase64;
