import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD517STPRfrc6NmRPzRMl3httGKlK0w7JY",
  authDomain: "job-agent-2d0cc.firebaseapp.com",
  projectId: "job-agent-2d0cc",
  storageBucket: "job-agent-2d0cc.firebasestorage.app",
  messagingSenderId: "92495090172",
  appId: "1:92495090172:web:081e046eb95c7810a1a279",
  measurementId: "G-K0FTQBBLNH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);