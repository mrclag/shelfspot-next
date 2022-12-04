import React from 'react'
// import styled from 'styled-components'
import ScrollItem from './SliderItem'

import {shelfDecorations} from './Customizations'

const Slider = () => {
  return (
    <div className='slider'>
      <div className="leftitems"><i className="fas fa-arrow-alt-circle-left"></i></div>
        {shelfDecorations.map((item, key) => (
          <ScrollItem key={key} item={item}/>
          )
        )}
      <div className="rightitems"><i className="fas fa-arrow-alt-circle-right"></i></div>
    </div>
  )
}

export default Slider

