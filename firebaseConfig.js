import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
// import "firebase/compat/auth";
import "firebase/compat/database";
// import "firebase/compat/firestore";
// import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
// 파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyCf2aWVAvjQlWAviAzO0BES7tYZN9HgOMU",
  authDomain: "myhoneytip-yoni.firebaseapp.com",
  projectId: "myhoneytip-yoni",
  storageBucket: "myhoneytip-yoni.appspot.com",
  messagingSenderId: "124862742987",
  appId: "1:124862742987:web:4583302961ebd4e64bb64e",
  measurementId: "G-4Z5LC4WPQE"
};

// 사용 방법입니다. 
// 파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()