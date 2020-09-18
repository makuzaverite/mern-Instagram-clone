import React, { useContext } from 'react'
import ProfileSnack from '../../Profile/ProfileSnack'
import Posts from '../../Posts/Posts'
import './Home.css'
import { AuthContext } from '../../../context/AuthContext'
import { Redirect } from 'react-router-dom'

function Home() {
	const { state } = useContext(AuthContext)

	if (!state.user) return <Redirect to='/login' />

	return (
		<section className='main'>
			<div>
				<Posts />
			</div>
			<div className='profiles'>
				<ProfileSnack />
			</div>
		</section>
	)
}

export default Home
