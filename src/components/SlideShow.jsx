import React from 'react'
import myImage from './../assets/photos/traveller-bag-mountains-isolation-1151553.jpg'

function SlideShow() {
  return (
    <>
      <div className="carousel-img-container">
        <img className="carousel-img" src={myImage} alt="beautiful landscape" />
        ;
      </div>
    </>
  )
}

export default SlideShow
