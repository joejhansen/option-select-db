import { useRef } from "react";

const Upload = ({ theme }) => {
    const styles = {
        uploadForm: {
            display: 'flex',
            justifyContent: 'center'
        }
    }
    const fileInput = useRef(null)
    const showData = () =>{
        console.log(fileInput)
    }
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