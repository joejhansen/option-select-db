// import { SlippiGame } from '@slippi/slippi-js'

import { useEffect, useRef, useState } from "react";

// const {SlippiGame} = require('@slippi/slippi-js')
const Upload = ({ theme }) => {
    const [selectedFiles, setSelectedFile] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    // useEffect(()=>{
    //     console.log('something')
    // })
    const fileInput = useRef(null)
    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
    };
    let slpUploadURI
    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFiles);

        fetch(
            slpUploadURI ? slpUploadURI : `http://localhost:3001`,
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const readFile = (file) => {
        let response
        console.log(file)
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = function () {
            // console.log(fileReader.result);
            return (fileReader.result)
            // console.log(response)
        };
        fileReader.onerror = function () {
            console.log(fileReader.error);
            return ``
        };
    }
    const renderFilesInfo = (files) => {
        let fileInfo = []
        // return(console.log(typeof files))
        for (let i = 0; i < files.length; i++) {
            // console.log(contents)
            fileInfo.push(
                <div>
                    <p>Filename: {files[i].name}</p>
                    <p>Filetype: {files[i].type}</p>
                    <p>Size in bytes: {files[i].size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {JSON.stringify(files[i].lastModifiedDate)}
                    </p>
                </div>
            )
        }
        return fileInfo
    }
    return (
        <>
            <input type="file" name="file" ref={fileInput} onChange={changeHandler} multiple />
            {selectedFiles.length ?
                <>
                    {renderFilesInfo(selectedFiles)}
                </>
                :
                <p>Select a file to show details</p>
            }
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </>
    )
}

export default Upload