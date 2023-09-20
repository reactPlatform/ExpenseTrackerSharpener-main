import { initializeApp } from "firebase/app";
import {useEffect, useState} from 'react';
import {getAuth,onAuthStateChanged, updateProfile} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';
import {addDoc,collection,deleteDoc,doc ,query,where,getDocs} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDknp6srfSt25U5HBW8XNcI4_ulz7FKXyg",
  authDomain: "new-db-de139.firebaseapp.com",
  projectId: "new-db-de139",
  storageBucket: "new-db-de139.appspot.com",
  messagingSenderId: "618125316250",
  appId: "1:618125316250:web:59790395e341b709d6cf23"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export const database = getAuth(app);

export function useGetCurrentUser(){
  const [currentUser,setCurrentUser] = useState();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  },[])
 return currentUser; 
}

export async function uploadProfilePhoto(file,currentUser){
  const fileRef = ref(storage,currentUser.uid + '.png');
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser,{photoURL});

}

export function updateProfileDetails(name,currentUser){
  updateProfile(currentUser,{displayName:name})
}

//Adding to Document in Firestore
export const db = getFirestore();
const dbName = 'ExpenseDetails';
export function updateDetailsInDB(uid,productName,productPrice,productId){
  addDoc(collection(db,dbName),{uid,productName,productPrice,productId});
}


//Deleting Document from firestore
export async function deleteDetailsInDB(serverId){
  await deleteDoc(doc(db,dbName,serverId));
}

export async function getExpenseDetails(uid){
  
  let expenseDetailsFromDB = [];
  const queryString = query(collection(db,dbName),where("uid","==",uid));
  
  const expDetails = await getDocs(queryString);
  for(const expenseDetail of expDetails.docs){
    const detail = expenseDetail.data();
    detail.serverId = expenseDetail.id;
   expenseDetailsFromDB.push(detail);
  }
  return expenseDetailsFromDB;
  

}