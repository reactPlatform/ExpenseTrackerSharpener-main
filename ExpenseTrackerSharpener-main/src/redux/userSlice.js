import { createSlice } from "@reduxjs/toolkit";


const initialUserState = {
    isPremiumActivated : false,
    downloadURL : null
}

const userSlice = createSlice({
    name:'userSlice',
    initialState: initialUserState,
    reducers: {
        activatePremium(state,action){
            state.isPremiumActivated = !state.isPremiumActivated
            console.log(state.isToggled)
        },

        downloadCSV(state,action){
            debugger
            let array = action.payload;
            let header = Object.keys(array[0]).join(',');
            let csv = array.map(obj => Object.values(obj).join(',')).join('\n');
            let csvString = header + '\n' + csv;
            let blob = new Blob([csvString], { type: 'text/csv' });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ExpenseList.csv';
            link.click();
        }
        
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;