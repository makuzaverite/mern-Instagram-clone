import React from 'react'
import './Progress.css'

const Progress = (props) => {
  const containerStyles = {
    height: '20px',
    textAlign: 'center',
    fontFamily: 'Poppins',
    width: '50%',
    backgroundColor: '#b1a3c9',
    borderRadius: '20px',
    margin: 'auto',
    marginBottom: '15px !important',
  }

  const filterStyles = {
    height: '100%',
    width: `${props.percentage}%`,
    backgroundColor: '#4815a1',
    borderRadius: 'inherit',
    // textAlign: 'center',
    transition: 'width 2s ease-in-out',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }

  return props.percentage ? (
    <>
      <p>Uploaded size</p>
      <div style={containerStyles}>
        <div style={filterStyles}>
          <span style={labelStyles}>{props.percentage}%</span>
        </div>
      </div>
    </>
  ) : null
}

export default Progress
