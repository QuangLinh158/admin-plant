import { combineReducers } from "redux";
import cateReducer from "./category-reducer/reducer";
import discountReducer from "./discount-reducer/reducer";
import productReducer from "./product-redux/reducer";


const rootReducer = combineReducers({
    categories: cateReducer,
    discounts : discountReducer,
    products:productReducer
});

export default rootReducer;