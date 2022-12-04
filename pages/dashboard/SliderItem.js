import React from 'react'
// import {connect} from 'react-redux'
// import styled from 'styled-components'
// import {changeDecoration} from '../../actions/profile'
import Image from 'next/image'

const SliderItem = ({item }) => {
  const decoration = ''
  const active = item.id === decoration ? true : false



  const onClick = (item) => {
    // changeDecoration(item.id)
  }
  return (
    <div className={`slider-item ${active ? 'active' : ''}`} onClick={() => onClick(item)}>
      <Image  src={item.icon} alt="" fill={true} height='80%' width='80%' />
    </div>
  )
}


export default SliderItem
