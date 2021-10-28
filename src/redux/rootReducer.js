import { combineReducers } from "redux";
import discountReducer from "./reducer";

const rootReducer = combineReducers({
    data: discountReducer
});

export default rootReducer;