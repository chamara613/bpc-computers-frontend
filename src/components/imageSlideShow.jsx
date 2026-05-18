
import { useState } from "react";

export default function ImageSlideShow(props){

    const images = props.images;

    const [activeImage, setActiveImage] = useState(0);

    function getClassName(index){

        if(index == activeImage){
            return "w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] object-contain rounded-[20px] border-accent border-4 cursor-pointer";
        }

        return "w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] object-contain rounded-[20px] border-accent border-2 cursor-pointer";
    }

    return(
        <div className="w-full max-w-[500px] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-dominant rounded-[20px] flex flex-col items-center justify-center p-4">

            {/* Main Image */}
            <img
                src={images[activeImage]}
                alt="Product Image"
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-contain rounded-[20px]"
            />

            {/* Thumbnails */}
            <div className="w-full flex flex-wrap px-4 gap-3 items-center justify-center mt-4">

                {
                    images.map(
                        (img, index) => {

                            return(
                                <img
                                    onClick={
                                        ()=>{
                                            setActiveImage(index)
                                        }
                                    }
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className={getClassName(index)}
                                />
                            )
                        }
                    )
                }

            </div>

        </div>
    )
}