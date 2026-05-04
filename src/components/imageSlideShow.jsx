import { useState } from "react";
export default function ImageSlideShow(props){
    const images = props.images;

    const [activeImage, setActiveImage] = useState(0);

    function getClassName(index){
        if(index == activeImage){
            return "w-[90px] h-[90px] object-contain rounded-[20px] border-accent border-4 cursor-pointer";
        }
        return "w-[90px] h-[90px] object-contain rounded-[20px] border-accent border-2 cursor-pointer";
    }

    return(
        <div className="w-125 h-150 border">
            <img src={images[activeImage]} alt="Product Image" className="w-full h-125 object-cover"/>
            <div className="w-full h-25 flex flex-row px-4 gap-4 items-center justify-center">
                {
                    images.map(
                        (img, index) => {
                        return  <img 
                        onClick={
                            ()=>{ 
                                setActiveImage(index)

                            }
                        }
                        key={index} 
                        src={img} alt={`Thumbnail ${index}`} 
                        className={getClassName(index)}
                        />

                    })
                }

            </div>
           
        </div>  
    )
}

