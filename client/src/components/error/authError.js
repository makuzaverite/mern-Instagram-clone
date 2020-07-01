import React from 'react'

function authError(props) {
  return (
    <p
      style={{
        color: 'red',
        textAlign: 'center',
        padding: '5px 0',
        fontSize: '15px',
      }}
    >
      {props.error}
    </p>
  )
}

export default authError
