import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { database } from "../components/firebaseConfig";

const initialAuthState = {
    authenticationMessage: '',
    shouldNavigate: false,
    currentUserId: ''
};
const authSlice = createSlice({
  name: "authentication",
  initialState:  initialAuthState,
  reducers: {
    handleLogin(state, action) {
      const {email, password, history} = action.payload;
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          debugger
          sessionStorage.setItem("currentUserId", data.user.uid);
          history('/home');
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    handleSignUp(state, action) {
      const {email, password, confirmPassword, history} = action.payload;
      if (password === confirmPassword) {
        state.authenticationMessage = "Passwords Matched";
        createUserWithEmailAndPassword(database, email, password)
          .then((data) => {
            history("/home");
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        state.authenticationMessage = "Passwords not matched";
      }
    },
    handleSignOut() {
      signOut(database).then(val => {
        return true;
    })
    }
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
