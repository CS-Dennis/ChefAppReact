import React from 'react'

export default function ImageFrame({ imageUrl }) {
  return (
    <>
      <img src={imageUrl} style={{ width: 'auto', maxWidth: '100%', height: '400px', borderRadius: '15px' }} />
    </>
  )
}
