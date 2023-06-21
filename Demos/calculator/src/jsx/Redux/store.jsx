import ACTIONS from "./action";
import reducer from "./reducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer
});

export default store;