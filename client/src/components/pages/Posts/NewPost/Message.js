import React from 'react'

export default function Message(props) {
  return (
    <span style={{ color: 'red', fontFamily: 'Poppins' }}>{props.message}</span>
  )
}
