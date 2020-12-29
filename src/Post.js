import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post() {
	return (
		<div className='post'>
			<div className='post__header'>
				<Avatar
					className='post__avatar'
					alt='Jamie'
					src='/static/images/avatar/1.jpg'
				></Avatar>
				<h3>Username</h3>
				{/* header -> avatar + username*/}
			</div>

			{/* image */}
			<img
				className='post__image'
				src='https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg'
				alt=''
			/>
			<h4 className='post__text'>
				<strong>JamieDawson:</strong> WOW I'm coding
			</h4>
			{/* username + caption */}
		</div>
	);
}

export default Post;

//rfce
