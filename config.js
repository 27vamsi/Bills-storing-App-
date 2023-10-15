import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig =  {
    apiKey: "AIzaSyCKkl7zvqRbcWW7_XnDSaNiNMni-Npytcw",
  authDomain: "test-436b9.firebaseapp.com",
  projectId: "test-436b9",
  storageBucket: "test-436b9.appspot.com",
  messagingSenderId: "275684924297",
  appId: "1:275684924297:web:5598882bfb20e8dd969f58"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};