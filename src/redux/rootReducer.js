import { combineReducers } from "redux";
import discountReducer from "./discount-reducer/reducer";
import cateReducer from "./category-reducer/reducer";
import productReducer from "./product-redux/reducer";

const rootReducer = combineReducers({
    discounts: discountReducer,
    categories:cateReducer,
    products:productReducer
});

export default rootReducer;