import React, { useState, useEffect, useImperativeHandle, useCallback } from 'react';
import MuiDivider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import MuiButton from '@material-ui/core/Button';
import './FileUpload.css';

//todo buraya bak bi
//https://codesandbox.io/s/2zzjljmnzn
//https://react.semantic-ui.com/elements/button/

const FileUpload = (props) => {
    const [image4K, setImage4K] = useState({});
    const [imageHD, setImageHD] = useState({});
    const [imageThumbnail, setImageThumbnail] = useState({});


    const onChange4K = (e) => {
        setImage4K({ file: e.target.files[0] })
        console.log('onChange4K')
    }

    const onChangeHD = (e) => {
        setImageHD({ file: e.target.files[0] })
        console.log('onChangeHD')
    }

    const onChangeThumbnail = (e) => {
        setImageThumbnail({ file: e.target.files[0] })
        console.log('onChangeThumbnail')
    }

    return (
        <div >
            <h1>File Upload</h1>

            <body id="outer">
                <label>
                    Select 4K Image
                <input type="file" onChange={onChange4K} />
                </label>

                <label>
                    Select HD Image
                <input type="file" onChange={onChangeHD} />
                </label>

                <label>
                    Select Thumbnail Image
                <input type="file" onChange={onChangeThumbnail} />
                </label>
            </body>

        </div>

    );
}

export default FileUpload;