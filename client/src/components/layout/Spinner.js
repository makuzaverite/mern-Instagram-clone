import React from 'react'
import spinnerimage from './Spinner.gif'

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={spinnerimage} alt="Spinner" />
    </div>
  )
}

export default Spinner
