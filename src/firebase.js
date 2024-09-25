// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAOQrFzpM3xEA9UXvZXMEZY1MHqeXiwU84',
  authDomain: 'fir-churead.firebaseapp.com',
  projectId: 'fir-churead',
  storageBucket: 'fir-churead.appspot.com',
  messagingSenderId: '189709563301',
  appId: '1:189709563301:web:94534c75c7835590d9a44c',
  measurementId: 'G-TJ6DPMYT1N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 우리 프로젝트에 대한 인증서비스를 사용하겠다 라는 의미

export const auth = getAuth(app);
