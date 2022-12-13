// import { SlippiGame } from '@slippi/slippi-js'

import { useRef } from "react";

// const {SlippiGame} = require('@slippi/slippi-js')
const Upload = ({ theme }) => {
    const styles = {
        uploadForm: {
            display: 'flex',
            justifyContent: 'center'
        }
    }
    // const [selectedFiles, setSelectedFile] = useState([]);
    // const [isFilePicked, setIsFilePicked] = useState(false);
    // useEffect(()=>{
    //     console.log('something')
    // })
    const fileInput = useRef(null)
    const showData = () =>{
        console.log(fileInput)
    }
    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files);
    // };
    // let slpUploadURI
    // const handleSubmission = () => {
    //     const formData = new FormData();
    //     formData.append('File', selectedFiles);
    // };
    // const readFile = (file) => {
    //     let response
    //     console.log(file)
    //     let fileReader = new FileReader();
    //     fileReader.readAsText(file);
    //     fileReader.onload = function () {
    //         // console.log(fileReader.result);
    //         return (fileReader.result)
    //         // console.log(response)
    //     };
    //     fileReader.onerror = function () {
    //         console.log(fileReader.error);
    //         return ``
    //     };
    // }
    // const renderFilesInfo = (files) => {
    //     let fileInfo = []
    //     // return(console.log(typeof files))
    //     for (let i = 0; i < files.length; i++) {
    //         // console.log(contents)
    //         fileInfo.push(
    //             <div>
    //                 <p>Filename: {files[i].name}</p>
    //                 <p>Filetype: {files[i].type}</p>
    //                 <p>Size in bytes: {files[i].size}</p>
    //                 <p>
    //                     lastModifiedDate:{' '}
    //                     {JSON.stringify(files[i].lastModifiedDate)}
    //                 </p>
    //             </div>
    //         )
    //     }
    //     return fileInfo
    // }
    return (
        <>
            <form ref={fileInput} id="uploadSlp" action="/data/upload" method="post" encType="multipart/form-data" style={styles.uploadForm} onClick={showData}>
                <input type="file" name="slpFiles" multiple />
                <input type="submit" value="Upload .slp!" />
            </form>
        </>
    )
}

export default Upload