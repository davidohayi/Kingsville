// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAD8FdzmZci4z-0vkRU4tCmbcjtCch_kEg",
  authDomain: "mywebsiteauth-5bd13.firebaseapp.com",
  projectId: "mywebsiteauth-5bd13",
  storageBucket: "mywebsiteauth-5bd13.appspot.com",
  messagingSenderId: "834904304240",
  appId: "1:834904304240:web:565ec6ec7dd46113c862b5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= ELEMENTS =================
const form = document.getElementById("form");
const firstname = document.getElementById("firstname-input");
const lastname = document.getElementById("lastname-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const repeatPassword = document.getElementById("repeat-password-input");
const errorMsg = document.getElementById("error-message");
const socialBtns = document.querySelectorAll(".social-btn");

const isSignup = !!repeatPassword;

// ================= FORM SUBMIT =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  let errors = [];

  if (isSignup) {
    errors = getSignupFormErrors(
      firstname.value,
      lastname.value,
      email.value,
      password.value,
      repeatPassword.value
    );
  } else {
    errors = getLoginFormErrors(email.value, password.value);
  }

  if (errors.length > 0) {
    errorMsg.textContent = errors.join(". ");
    return;
  }

  try {
    if (isSignup) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = "login.html";
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});

// ================= GOOGLE AUTH =================
const googleProvider = new GoogleAuthProvider();
socialBtns[0]?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});

// ================= FACEBOOK AUTH =================
const facebookProvider = new FacebookAuthProvider();
socialBtns[1]?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});

