import { combineReducers } from "redux";
import discountReducer from "./discount-reducer/reducer";
import cateReducer from "./category-reducer/reducer";
import productReducer from "./product-redux/reducer";
import newsReducer from "./news-reducer/reducer";

const rootReducer = combineReducers({
    discounts: discountReducer,
    categories:cateReducer,
    products:productReducer,
    news:newsReducer
});

export default rootReducer;