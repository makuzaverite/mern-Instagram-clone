import React from 'react'
import Posts from '../Posts/Posts'
import ProfileSnack from '../../ProfileSnackbar/ProfileSnack'
import './Home.css'

function Home() {
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
