import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState(null);

	//listens when auth change happens.
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user has logged in...
				console.log(authUser);
				setUser(authUser);
			} else {
				// user logged out
				setUser(null);
			}
		});
		return () => {
			//perform some cleanup action
			unsubscribe();
		};
	}, [user, username]);

	//useEffect() -> runs piece of code based on specific condition
	//doc.id -> gets id of post
	//doc.data() gets all the info from the post (caption, imageUrl, username, etc)
	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(snapshot.docs.map((doc) => ({id: doc.id, post: doc.data()}))); //keeps track of changes to db.
			});
	}, []);

	const signUp = (event) => {
		event.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));

		setOpen(false);
	};

	const signIn = (event) => {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));

		setOpenSignIn(false);
	};

	return (
		<div className='App'>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__signup'>
						<img
							className='app__headerImage'
							src='https://hubpng.com/download/W2ggu4BM7WFdPZaFwCkc8gH7ES5Adp6J1EVPvw8RFgb7yB8y9LYAb6B8mOkQ4SeOrzwimIxIC0aWrlmlzHkj3sfh0yhOJYa8DVdpw4bgDFGFXwvj8Jg3dtPPinexz44sc5eDzwIqmvkwR1Piq09tA2oxQ64OPgORmcw9GUqgJtFWHMkXu6FK18oyxX8u9NG5amRIziVP/small'
							alt=''
						/>

						<Input
							placeholder='username'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<Input
							placeholder='email'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							placeholder='password'
							type='text'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type='submit' onClick={signUp}>
							Sign UPP
						</Button>
					</form>
				</div>
			</Modal>

			{/* new modal */}

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__signup'>
						<img
							className='app__headerImage'
							src='https://hubpng.com/download/W2ggu4BM7WFdPZaFwCkc8gH7ES5Adp6J1EVPvw8RFgb7yB8y9LYAb6B8mOkQ4SeOrzwimIxIC0aWrlmlzHkj3sfh0yhOJYa8DVdpw4bgDFGFXwvj8Jg3dtPPinexz44sc5eDzwIqmvkwR1Piq09tA2oxQ64OPgORmcw9GUqgJtFWHMkXu6FK18oyxX8u9NG5amRIziVP/small'
							alt=''
						/>

						<Input
							placeholder='email'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							placeholder='password'
							type='text'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type='submit' onClick={signIn}>
							Sign In
						</Button>
					</form>
				</div>
			</Modal>

			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://hubpng.com/download/W2ggu4BM7WFdPZaFwCkc8gH7ES5Adp6J1EVPvw8RFgb7yB8y9LYAb6B8mOkQ4SeOrzwimIxIC0aWrlmlzHkj3sfh0yhOJYa8DVdpw4bgDFGFXwvj8Jg3dtPPinexz44sc5eDzwIqmvkwR1Piq09tA2oxQ64OPgORmcw9GUqgJtFWHMkXu6FK18oyxX8u9NG5amRIziVP/small'
					alt=''
				/>
				{user ? (
					<Button onClick={() => auth.signOut()}>logOUT</Button>
				) : (
					<div className='app__loginContainer'>
						<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
						<Button onClick={() => setOpen(true)}>Sign UP</Button>
					</div>
				)}
			</div>

			<div className='app__posts'>
				{/* the key={id} prevents refendering of whole list */}
				{posts.map(({id, post}) => (
					<Post
						key={id}
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
					></Post>
				))}
				<InstagramEmbed
					url='https://instagr.am/p/Zw9o4/'
					// clientAccessToken='123|456'
					maxWidth={320}
					hideCaption={false}
					containerTagName='div'
					protocol=''
					injectScript
					onLoading={() => {}}
					onSuccess={() => {}}
					onAfterRender={() => {}}
					onFailure={() => {}}
				/>
			</div>

			{/* user? prevents it from breaking */}
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>You need to login to upload!</h3>
			)}
		</div>
	);
}

export default App;
//1:58:30
