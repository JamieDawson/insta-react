import React, {setState} from 'react';
import './App.css';
import Post from './Post';

function App() {
	const [posts, setPosts] = setState([
		{
			username: 'tom',
			caption: 'nice job',
			imageUrl:
				'https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg',
		},
		{
			username: 'tom',
			caption: 'nice job',
			imageUrl:
				'https://i.pinimg.com/originals/7a/af/0f/7aaf0f1d48f57b7779c0fbcf103c2d0f.jpg',
		},
	]);

	return (
		<div className='App'>
			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.clipartmax.com/png/small/176-1766224_instagram-logos-in-vector-format-free-download-instagram-logo-small-size.png'
					alt=''
				/>
			</div>
			{posts.map((post) => (
				<Post
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				></Post>
			))}
		</div>
	);
}

export default App;
//57:41
