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
                <h5 style={{margin:'auto'}}>C???p Nh???t Tr???ng Th??i ????n H??ng</h5>
            </div>

            <div className="hr"></div>
            <br/>
            <div>
            {
                doSomeThing(Order.idOrder).map(item => (
                    <div className="row">
                        <div className="col-sm-4" ><img src={item.imagePro} width={60} height={60} style={{marginTop:5,backgroundColor:"#74C69D", borderRadius:30}}/></div>
                        <div className="col-sm-4" style={{marginTop:15}}>T??n c??y: {item.namePro}</div>
                        <div className="col-sm-4" style={{marginTop:15}}>S??? l?????ng c??y: {item.quantity}</div>
                    </div>
                ))
            }
            </div>
            <hr/>
            
            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
                <div className="col-md-4">
                    <label  className="form-label">M?? ????n H??ng</label>
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
                    <label className="form-label">T??n Ng?????i Nh???n</label>
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
                    <label  className="form-label">S??? ??i???n Tho???i</label>
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
                    <label className="form-label">?????a Ch???</label>
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
                    <label className="form-label">S??? L?????ng</label>
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
                    <label className="form-label">Ph????ng Th???c Thanh To??n</label>
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
                    <label className="form-label">??i???m T??ch L??y</label>
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
                    <label className="form-label">Ng??y Thanh To??n</label>
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
                    <label className="form-label">Tr???ng Th??i Thanh To??n</label>
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
                    <label className="form-label">Ph?? V???n Chuy???n</label>
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
                    <label className="form-label">Khuy???n M??i</label>
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
                    <label className="form-label">T???ng Ti???n</label>
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
                    <label className="form-label">Tr???ng Th??i ????n</label>
                    <div className="input-group">
                        <select defaultValue=""
                            value={state}
                            name="state"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            <option value="Ch??? x??c nh???n">Ch??? x??c nh???n</option>
                            <option value="???? x??c nh???n">???? x??c nh???n</option>
                            
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Ng??y Giao D??? Ki???n</label>
                    <div className="input-group">
                        <select defaultValue=""
                            value={dateDelivery}
                            name="dateDelivery"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            <option value="1-3 ng??y">1-3 ng??y</option>
                            <option value="3-6 ng??y">3-6 ng??y</option>
                            <option value="Tr??n 6 ng??y">Tr??n 6 ng??y</option>
                            
                        </select>
                    </div>
                </div>
               
                <div className="col-md-4">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">C???p nh???t</button>
                </div>

            </form>
        </div>
    )
}

export default EditUnconfirmVoice;
