// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { VueFire } from 'vuefire'
import {boot} from "quasar/wrappers"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3m2zZgdruoLndFoM9cUzrC4FUIxZuVKU",
  authDomain: "cellphone-2e631.firebaseapp.com",
  projectId: "cellphone-2e631",
  storageBucket: "cellphone-2e631.appspot.com",
  messagingSenderId: "426926201537",
  appId: "1:426926201537:web:fa1514b50a5df5fc625240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export default boot(({app})=>{
    app.use(VueFire, {
        // imported above but could also just be created here
        app,
        modules: [
          // we will see other modules later on
        ],
      })
});
export{db, storage};