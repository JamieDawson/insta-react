import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyA6auY9-VN6OzmknSRPbUsazATPDB1-W3w',
	authDomain: 'instagram-clone-react-ce6ca.firebaseapp.com',
	databaseURL:
		'https://instagram-clone-react-ce6ca-default-rtdb.firebaseio.com',
	projectId: 'instagram-clone-react-ce6ca',
	storageBucket: 'instagram-clone-react-ce6ca.appspot.com',
	messagingSenderId: '502242170351',
	appId: '1:502242170351:web:8ef0cc13be415df82c521a',
	measurementId: 'G-QPCZYFT6HY',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
