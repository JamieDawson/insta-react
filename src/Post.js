import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({username, caption, imageUrl}) {
	return (
		<div className='post'>
			<div className='post__header'>
				<Avatar
					className='post__avatar'
					alt='unknown_user'
					src='/static/images/avatar/1.jpg'
				></Avatar>
				<h3>{username}</h3>
				{/* header -> avatar + username*/}
			</div>

			<img className='post__image' src={imageUrl} alt='' />
			<h4 className='post__text'>
				<strong>JamieDawson:</strong> {caption}
			</h4>
			{/* username + caption */}
		</div>
	);
}

export default Post;

//rfce
