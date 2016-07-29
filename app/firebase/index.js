import firebase from 'firebase';

try {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBa-9exrIm688wFkNHG26E5nM3AEWYZzpk",
		authDomain: "tirpox-todoapp.firebaseapp.com",
		databaseURL: "https://tirpox-todoapp.firebaseio.com",
		storageBucket: "tirpox-todoapp.appspot.com",
	};

	firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;