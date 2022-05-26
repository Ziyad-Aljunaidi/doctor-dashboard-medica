import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js'
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
// Add Firebase products that you want to use

import {getStorage} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'
import{ ref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'
import { uploadBytes } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'

const firebaseConfig = {
apiKey: "AIzaSyD18CvQu6AWzU9CFu_75aL92nOThgeZd6A",
authDomain: "medica72-5933c.firebaseapp.com",
projectId: "medica72-5933c",
storageBucket: "medica72-5933c.appspot.com",
messagingSenderId: "814793286058",
appId: "1:814793286058:web:b5be2e4e256510d27b0bd3",
measurementId: "G-210D30MJ18"
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

const storageRef = ref(storage);

// Create a child reference
const imagesRef = ref(storage, 'ss.jpg');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, 'images/ss.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"\

//uploadBytes(spaceRef, file).then((snapshot) => {
//  console.log('Uploaded a blob or file!');
//});








