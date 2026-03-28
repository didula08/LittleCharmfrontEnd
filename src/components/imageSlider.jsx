import React from "react";
import { useState } from "react";


export default function ImageSlider(props){
    const image=props.image;
    const [currentIndex, setCurrentIndex] = useState(0);
    return(
        <div className="w-[500px] h-[600px] flex flex-col justify-center items-center m-10">
            <img src={image[currentIndex]} className="w-full h-[500px] object-cover"/>
            <div className="w-full h-[100px] flex justify-center items-center">
                {
                    image?.map(
                        (image,index)=>{
                            return(

                                <img key={index} className={"w-[90px] h-[90px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-secondary"+ (index==currentIndex && "border-4 border-secondary")} src={image} onClick={()=>setCurrentIndex(index)}/>

                            )
                        }
                    )
                }
            </div>
        </div>
    )
}