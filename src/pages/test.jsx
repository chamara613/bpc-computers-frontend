// import { useState } from "react"
// import uploadFile from "../utils/mediaUpload.js";

// export default function Test() {

//     const [files, setFiles] = useState(null);

//     async function upload(){
//         try{

//             const url = await uploadFile(files)
//             console.log(url);

//         }catch(err){
//             console.log("upload failed", err);
//         }
//     }
   
//     return(
//         <div className="w-full h-full flex items-center justify-center">

//             <input 
//                 type="file" 
//                 onChange={(e)=> setFiles(e.target.files[0])}
//             />

//             <button onClick={upload}>
//                 Upload
//             </button>

//         </div>
//     )
// }

export default function test(){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-25 h-25 border-8 border-accent border-b-transparent rounded-full animate-spin"></div>
        </div>
    )
}
