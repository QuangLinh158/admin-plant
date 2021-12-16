import React, {useState,useEffect} from 'react';
// import {DatePickerComponent} from "@syncfusion/ej2-react-calendars/src/datepicker/datepicker.component";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderInitiate } from '../redux/order-reducer/action';

const initialState = {
    Promotion:0,
    addressCus:"",
    costShip:0,
    date:"",
    dateDelivery:"",
    idCus:"",
    idOrder:"",
    nameCus:"",
    payment:"",
    phoneCus:"",
    point:"",
    quantity:0,
    state:"",
    statePayment:"",
    totalPayment:0,
    totalPrice:0
}

const EditUnconfirmVoice = (props) => {

    // const startValue:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    // const minDate:Date = new Date(new Date().getFullYear(), new Date().getMonth(), 4);

    const [state1, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {Promotion, addressCus, costShip, date, dateDelivery, idCus, idOrder, nameCus,
        payment, phoneCus, point, quantity, state, statePayment, totalPayment, totalPrice} = state1;

    const dispatch = useDispatch();
    const history = useHistory();

    const getItemID = (str) => {
        let a = str.split('/');
        return a[2];
    }

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state1, [name]: value});
    };

    const {Orders, Order} = useSelector(state1 =>state1.Orders);
    const detailOrders = useSelector(state1 => state1.DetailOrders.DetailOrders);

    //filer detail order map filter 
    function doSomeThing(id) {
        let arr = detailOrders.filter(item => item.idOrder === id);
        return arr;
    }

    useEffect(() => {
        getItemID(props.location.pathname);
        if(Order){
            setState({ ...Order});
        }
     },[Order]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = getItemID(props.location.pathname);
        dispatch(updateOrderInitiate(id,state1));
        setState({Promotion:0,
            addressCus:"",
            costShip:0,
            date:"",
            dateDelivery:"",
            idCus:"",
            idOrder:"",
            nameCus:"",
            payment:"",
            phoneCus:"",
            point:"",
            quantity:0,
            state:"",
            statePayment:"",
            totalPayment:0,
            totalPrice:0});
        history.push('/trangthaidon/cxn');
    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:400,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h5 style={{margin:'auto'}}>Cập Nhật Trạng Thái Đơn Hàng</h5>
            </div>

            <div className="hr"></div>
            <br/>
            <div>
            {
                doSomeThing(Order.idOrder).map(item => (
                    <div className="row">
                        <div className="col-sm-4" ><img src={item.imagePro} width={60} height={60} style={{marginTop:5,backgroundColor:"#74C69D", borderRadius:30}}/></div>
                        <div className="col-sm-4" style={{marginTop:15}}>Tên cây: {item.namePro}</div>
                        <div className="col-sm-4" style={{marginTop:15}}>Số lượng cây: {item.quantity}</div>
                    </div>
                ))
            }
            </div>
            <hr/>
            
            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
                <div className="col-md-4">
                    <label  className="form-label">Mã Đơn Hàng</label>
                    <input 
                        readOnly="readonly"
                        type="text" 
                        className="form-control" 
                        value={idOrder}
                        name="idOrder"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Tên Người Nhận</label>
                    <input 
                        readOnly="readonly"
                        type="text" 
                        className="form-control" 
                        value={nameCus}
                        name="nameCus"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Số Điện Thoại</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={phoneCus}
                            name="phoneCus"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Địa Chỉ</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={addressCus}
                            name="addressCus"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Số Lượng</label>
                        <input 
                            readOnly="readonly"
                            type="number" 
                            className="form-control" 
                            value={quantity}
                            name="quantity"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Phương Thức Thanh Toán</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={payment}
                            name="payment"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Điểm Tích Lũy</label>
                        <input 
                            readOnly="readonly"
                            type="number" 
                            className="form-control" 
                            value={point}
                            name="point"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Ngày Thanh Toán</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={date}
                            name="date"
                            onChange={handleInputChange}
                        />
                </div>
                

                <div className="col-md-4">
                    <label className="form-label">Trạng Thái Thanh Toán</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={statePayment}
                            name="statePayment"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Phí Vận Chuyển</label>
                        <input 
                            readOnly="readonly"
                            type="number" 
                            className="form-control" 
                            value={costShip}
                            name="costShip"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Khuyến Mãi</label>
                        <input 
                            readOnly="readonly"
                            type="number" 
                            className="form-control" 
                            value={Promotion}
                            name="Promotion"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tổng Tiền</label>
                        <input 
                            readOnly="readonly"
                            type="number" 
                            className="form-control" 
                            value={totalPayment}
                            name="totalPayment"
                            onChange={handleInputChange}
                        />
                </div>

                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Trạng Thái Đơn</label>
                    <div className="input-group">
                        <select defaultValue=""
                            value={state}
                            name="state"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Ngày Giao Dự Kiến</label>
                    <div className="input-group">
                        <select defaultValue=""
                            value={dateDelivery}
                            name="dateDelivery"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            <option value="1-3 ngày">1-3 ngày</option>
                            <option value="3-6 ngày">3-6 ngày</option>
                            <option value="Trên 6 ngày">Trên 6 ngày</option>
                            
                        </select>
                    </div>
                </div>
               
                <div className="col-md-4">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">Cập nhật</button>
                </div>

            </form>
        </div>
    )
}

export default EditUnconfirmVoice;
