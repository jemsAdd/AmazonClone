// import React,{useEffect, useState}from 'react'
// import LayOut from '../../components/Layout/LayOut'
// import { useParams } from 'react-router'
// import axios from 'axios'
// import { productUrl } from '../../Api/endPoints'
// import ProductCard from "../../components/Product/ProductCard";
// import classes from './Results.module.css'

// function Results() {
//   const [results, setResults] =useState([])
//   const {categoryName} = useParams()
//   useEffect(()=>{
//      axios.get (`${productUrl}/products/category/${categoryName}`).then((res)=>{
//     setResults(res.data)
//     console.log(res.data)
//   }).catch((err) =>{
//     console.log(err)
//     // console.log(results)
//   })
  
//   },[])
 
//   return (
//     <LayOut>
//       <section>
//         <h1 style={{ padding: "30px" }}>Results</h1>
//         <p style={{ padding: "30px" }}>Category / {categoryName}</p>
//         <hr />
//        <div className={classes.products_container} >
//             {results?.map((product) => ( 
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//       </section>
//       <div>Results</div>
//       </LayOut>
    
//   )
// }

// export default Results
import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from '../../components/Loader/Loader'
function Results() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
         setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
