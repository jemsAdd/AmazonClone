import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import{img} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import classes from './Carousel.module.css'
function CarouselEffect() {
  return (
    <div>
      <Carousel  autoPlay={true}
        infiniteLoop= {true}
        showIndicators={false}
        showThums= {true}
        >

            {
             img.map((imageItmeLink)=>{
                return <img src={imageItmeLink}/>
             })

            }
       
    
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}

export default CarouselEffect
