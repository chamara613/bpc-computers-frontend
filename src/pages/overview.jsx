import { useParams } from "react-router-dom";

export default function OverView(){

    const { productId } = useParams();

    console.log(productId); // test

    return(
        <div>
            <h1>Product Overview</h1>
            <p>Product ID: {productId}</p>
        </div>
    )
}