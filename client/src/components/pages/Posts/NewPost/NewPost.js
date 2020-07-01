import React, { useState } from 'react'
import './NewPost.css'
import Progress from './Progress'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Message from './Message'

function NewPost() {
  const [file, setFile] = useState('')
  const [message, setMessage] = useState('')
  const [uploadPercentage, setuploadPercentage] = useState(0)
  const history = useHistory()

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = await localStorage.getItem('auth-token')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
        onUploadProgress: (progressEvent) => {
          setuploadPercentage(
            Math.round(
              parseInt(progressEvent.loaded * 100) / progressEvent.total
            )
          )
          setTimeout(() => setuploadPercentage(0), 10000)
        },
      })
      if (res.data.data) setMessage('Post added successfully')
      history.push('/')
    } catch (error) {
      if (error.message.status === 5000) console.log('Some thing went wrong')
      setMessage(error.response.data.error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="newPost">
        {message ? <Message message={message} /> : null}
        <p>Upload a photo for new post</p>
        {/* <input type="file"  accept="image/*" /> */}
        <Progress percentage={uploadPercentage} />
        <input type="file" onChange={onChange} className="fileupload" />
        <input type="submit" value="new post" className="submitBtn" />
      </form>
    </>
  )
}

export default NewPost
