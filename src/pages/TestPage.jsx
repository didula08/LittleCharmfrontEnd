import { useState } from "react";
import React from "react";
import MediaUpload from "../utils/MediaUpload";


export default function TestPage() {

    const [image,setImage]= useState(null);


    function uploadImage() {
        MediaUpload(image).then(
            (res)=>{
                console.log("Image uploaded successfully:", res);
                // You can do something with the response, like updating the UI or state
            }
        ).catch(
            (error)=>{
                console.error("Error uploading image:", error);
                // Handle the error, maybe show a notification to the user
            }
        )

    }

    return(

        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e)=>{
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
            }}/>

            <button onClick={uploadImage} className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                Upload Image
            </button>


        </div>

        
    )
        




}

