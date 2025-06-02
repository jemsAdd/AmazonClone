// import React from 'react'

// import Carousel from '../../components/Carousel/CarouselEffect'
// import Category from '../../components/Category/Category'
// import Product from '../../components/Product/Product'
// import LayOut from '../../components/Layout/LayOut'


// function Landing() {
//   return (
// <LayOut>
  
//        <Carousel/>
//         <Category/>
//         <Product/>
       
// </LayOut>        
//   )
// }

// export default Landing
import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import Carousel from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
function Landing() {
  return (
    <LayOut>
        <Carousel/>
        <Category/>
        <Product/>
    </LayOut>
  )
}

export default Landing