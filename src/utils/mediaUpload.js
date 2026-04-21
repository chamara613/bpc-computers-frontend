import { createClient } from "@supabase/supabase-js"
const  supabasekey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5aXhtbXp0d2FveGtybnVvbm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjI5ODksImV4cCI6MjA5MjIzODk4OX0.NBRjJvBMpQmdCTFzj7s7MgADlX6SwQ34dibX1PueqhQ"
const  supabaseUrl = "https://pyixmmztwaoxkrnuonos.supabase.co"

const supabase = createClient(supabaseUrl,supabasekey)

export default function uploadFile(file){
    return new Promise(
    (resolve, reject)=>{
        if(file == null){
            reject("No file provided")
            return
        }
        const timestamp = new Date().getTime()
        const fileName = timestamp + "-"+file.name 

        supabase.storage.from("images").upload(fileName, file,{
            upsert: false,
            cacheControl: 3600
        }).then(
            ()=>{
                const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(url)
            }
            ).catch(
            ()=>{
                reject("Failed to upload file")
            }
        )
    }
    )
}