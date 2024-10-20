//* Unused store, used to help me learn Redux
// Make sure to wrap your index.js with redux's <Provider store={store}/>

import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    oneState: 'Mary',
    twoState: 'John',
};

// Create actions with a slice
//* You need first to define the dispatch with const dispatch = useDispatch(); in whatever component is handling the state change
const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        updateOneState: (state, action) => { //* Change a state with dispatch(updateOneState('new value'));
            state.oneState = action.payload;
        },
        updateTwoState: (state, action) => {
            state.twoState = action.payload;
        }
    }
});

// Extract the actions for future dispatching
export const { updateOneState, updateTwoState } = rootSlice.actions;

// Configure the redux store with slice and reducer
const store = configureStore({ reducer: rootSlice.reducer });

export default store;
