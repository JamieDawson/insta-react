import './App.css';
import Post from './Post';

function App() {
	return (
		<div className='App'>
			{/*Header */}
			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.clipartmax.com/png/small/176-1766224_instagram-logos-in-vector-format-free-download-instagram-logo-small-size.png'
					alt=''
				/>
			</div>

			{/*post */}
			<Post />
			<Post />
			<Post />
			<Post />

			{/* Post */}
		</div>
	);
}

export default App;
