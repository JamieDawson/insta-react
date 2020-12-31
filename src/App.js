import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
	const [posts, setPosts] = useState([]);

	//useEffect() -> runs piece of code based on specific condition
	useEffect(() => {
		db.collection('posts').onSnapshot((snapshot) => {
			setPosts(snapshot.docs.map((doc) => doc.data())); //keeps track of changes to db.
		});
	}, []);

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
//1:17:45
