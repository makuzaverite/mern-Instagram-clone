import React from 'react'
import ProfileSnack from '../../Profile/ProfileSnack'
import Posts from '../../Posts/Posts'
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
