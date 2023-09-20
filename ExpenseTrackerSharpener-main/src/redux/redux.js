import {createSlice,configureStore} from '@reduxjs/toolkit';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {database} from '../firebaseConfig';
const initialState = {};
const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers: {
        handleLogin(email,password){
            
            signInWithEmailAndPassword(database,email,password).then(data => {
                debugger
                console.log(data);
            }).catch(err => {
                alert(err.message);
            })
        }
    }
})

const store = configureStore({
    reducer: {authentication: authSlice.reducer}
})

export const authActions = authSlice.actions;
export default store;