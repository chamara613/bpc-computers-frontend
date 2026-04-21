import { useState } from "react"
import uploadFile from "../utils/mediaUpload.js";

export default function Test() {

    const [files, setFiles] = useState(null);

    async function upload(){
        try{

            const url = await uploadFile(files)
            console.log(url);

        }catch(err){
            console.log("upload failed", err);
        }
    }
   
    return(
        <div className="w-full h-full flex items-center justify-center">

            <input 
                type="file" 
                onChange={(e)=> setFiles(e.target.files[0])}
            />

            <button onClick={upload}>
                Upload
            </button>

        </div>
    )
}