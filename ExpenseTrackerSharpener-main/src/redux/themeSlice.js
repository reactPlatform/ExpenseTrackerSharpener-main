import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    isDarkMode : false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers:{
        toggleTheme(state,action){
            state.isDarkMode = !state.isDarkMode
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;