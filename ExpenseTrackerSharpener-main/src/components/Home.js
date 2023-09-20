import React from 'react'
import {useState,useEffect} from 'react';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useGetCurrentUser} from './firebaseConfig';
import { authActions } from "../redux/authenticationSlice";
import { expenseActions, fetchExpenseData } from "../redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = () => {
      dispatch(authActions.handleSignOut());
      history('/login');
    }
    const [productName,setproductName] = useState('');
    const [productPrice,setproductPrice] = useState('');
    const currentUser = useGetCurrentUser();

    const items = useSelector((state) => state.expense.expenseItems);

    const handleExpenseAdder = async() => {
      const item = {
        productId: Math.floor(Math.random() * 1000),
        productName,
        productPrice
      }
      setproductName('');
      setproductPrice('');
      if (productName && productPrice){
        dispatch(expenseActions.addNewExpense({...item, userId: currentUser.uid}));
      }
    }

    const deleteExpense = async(id,serverId) => {
      await dispatch(expenseActions.deleteExpense({id,serverId}));
    }

    useEffect(()=>{
      async function fetchExpenses(){
        if(currentUser && currentUser.uid){
          dispatch(fetchExpenseData(currentUser.uid));
        }
      }
      fetchExpenses();
    },[currentUser,items])
  return (
    <>
    <div>
    <div style={{marginTop:'20px'}}>
    <div className='homeContainer'>Welcome to Expense Tracker</div>
    <div className='profileContainer'>Your Profile is incomplete. <Link to='/updateProfile'>Complete now</Link></div>
    </div>
    <div><button className='homeButton' onClick={handleSignOut}>Logout</button></div>
    </div>
    <div className='expenseAdder'>
    <div>
    <input type='text' placeholder='Enter the Expense Name' value={productName} onChange={e => setproductName(e.target.value)} className='expenseInputField'/>
    </div>
    <div>
    <input type='text' placeholder='Enter the Expense Price' value={productPrice} onChange={e => setproductPrice(e.target.value)} className='expenseInputField'/>
    </div>
    <div>
    <button className='expenseAdderButton' onClick={() => handleExpenseAdder()}>Add Expense</button>
    </div>
  </div>
  <div className='expenseAdderContainer'>
    {
      items.map((item) => {
        return(
          <li key={item.productId}><span style={{fontWeight:'600'}}>{item.productName}</span> <span style={{fontWeight:'600'}}>{item.productPrice}</span> <button className='expenseButton'>Edit</button> <button className='expenseButton' onClick={()=>deleteExpense(item.productId,item.serverId)}>Delete</button><hr/></li>
        )
      })
    }
  </div>
  </>
  )
}

export default Home