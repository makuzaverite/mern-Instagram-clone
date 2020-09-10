import React, { useState, useContext } from 'react'
import ReactDom from 'react-dom'
import './AddNewPost.css'
import DropZone from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { PostContext } from '../../context/PostContext'
import { post_types } from '../../actions/post_types'
import Progress from '../pages/Posts/NewPost/Progress'

const AddNewPost = ({ isopen, onClose }) => {
	const [postImage, setpostImage] = useState([])
	const [postCaption, setPostCaption] = useState('')
	const [error, setError] = useState('')
	const { state } = useContext(AuthContext)
	const { postDispatch } = useContext(PostContext)
	const [uploadPercentage, setuploadPercentage] = useState(0)
	const [message, setMessage] = useState('')

	const handleDrop = (acceptedImage) => {
		setpostImage(
			acceptedImage.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		)
	}

	const addPostArea = {
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
			},
		},
	}

	const modal = {
		hidden: {
			opacity: 0,
			y: -200,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { delay: 0.5 },
		},
		leave: {
			y: 200,
			opacity: 0,
			transition: { delay: 0.5 },
		},
	}

	const previewUploads = postImage.map((file) => (
		<div key={file.name}>
			<div>
				<img src={file.preview} style={{ width: '100%', height: '200px' }} alt='preview' />
			</div>
		</div>
	))

	async function submitPost(e) {
		e.preventDefault()
		const { token } = state
		const formData = new FormData()
		formData.append('file', postImage[0])
		formData.append('caption', postCaption)

		try {
			const res = await axios.post('http://localhost:5000/api/post', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
				onUploadProgress: (progressEvent) => {
					setuploadPercentage(
						Math.round(parseInt(progressEvent.loaded * 100) / progressEvent.total)
					)
					setTimeout(() => setuploadPercentage(0), 3000)
				},
			})
			if (res.data.data) {
				setMessage('Post added successfully')
				postDispatch({
					type: post_types.ADD_POST,
					payload: res.data.data,
				})
			}

			setPostCaption('')
			setpostImage([])
			onClose()
		} catch (error) {
			if (error.message.status === 5000) console.log('Some thing went wrong')
			console.log(error)
		}
	}

	if (!isopen) return null

	return ReactDom.createPortal(
		<>
			<AnimatePresence exitBeforeEnter>
				<motion.div
					className='addnewPostOverlay'
					variants={addPostArea}
					initial='hidden'
					animate='visible'
					exit='hidden'>
					<motion.div className='addNewPostModal' variants={modal} exit='leave'>
						<button onClick={onClose} className='closeModal'>
							X
						</button>
						<Progress progress={uploadPercentage} />
						<DropZone
							onDrop={handleDrop}
							accept='image/*'
							minSize={1024}
							maxSize={3072000}>
							{({
								getRootProps,
								getInputProps,
								isDragActive,
								isDragAccept,
								isDragReject,
							}) => {
								const additionalClass = isDragAccept
									? 'accept'
									: isDragReject
									? 'reject'
									: ''

								return (
									<div
										{...getRootProps({
											className: `addNewPostZone ${additionalClass}`,
										})}>
										<input {...getInputProps()} />
										<span>{isDragActive ? 'Drop here' : 'Drag here'}</span>
										<p>Drag and drop images, or click to select files</p>
									</div>
								)
							}}
						</DropZone>

						<div style={{ padding: '20px' }}>{previewUploads}</div>

						<div className='newPostFormControl'>
							<label htmlFor='post_caption'>Post caption</label>
							<input
								type='text'
								placeholder='add caption'
								id='post_caption'
								onChange={(e) => setPostCaption(e.target.value)}
							/>
						</div>
						<div className='newPostFormControl'>
							<input type='submit' value='Post' onClick={submitPost} />
						</div>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</>,
		document.getElementById('portal')
	)
}

export default AddNewPost
