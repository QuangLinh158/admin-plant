import React, {useState,useEffect} from 'react';
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


const EditConfirmvoice = (props) => {

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
        history.push('/trangthaidon/dxn');
    };


    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:400,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h5 style={{margin:'auto'}}>C???p Nh???t Tr???ng Th??i ????n H??ng</h5>
            </div>

            <div className="hr"></div>
            
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
                    <br/>
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
                            
                            <option value="???? x??c nh???n">???? x??c nh???n</option>
                            <option value="??ang giao">??ang giao</option>
                            
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

export default EditConfirmvoice;
