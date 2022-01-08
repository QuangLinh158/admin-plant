import { combineReducers } from "redux";
import discountReducer from "./discount-reducer/reducer";
import cateReducer from "./category-reducer/reducer";
import productReducer from "./product-redux/reducer";
import newsReducer from "./news-reducer/reducer";
import orderReducer from "./order-reducer/reducer";
import detailOrdersReducer from "./detailOrder-reducer/reducer";
import feedBackReducer from "./feedBack-reducer/reducer";
import usersReducer from "./user-reducer/reducer";


const rootReducer = combineReducers({
    discounts: discountReducer,
    categories:cateReducer,
    products:productReducer,
    news:newsReducer,
    Orders:orderReducer,
    DetailOrders:detailOrdersReducer,
    Feedback:feedBackReducer,
    Users:usersReducer
});

export default rootReducer;