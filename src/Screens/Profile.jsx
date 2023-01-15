import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <>
      <Button><Link to={'/'}>Back</Link></Button>
      <div>Profile</div>
    </>
  )
}
