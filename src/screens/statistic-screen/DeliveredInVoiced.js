import React,{useEffect,useState} from 'react';
//import {Select} from "@material-ui/core";
//import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { getOrdersInitiate, getOrderInitiate, deleteOrderInitiate, reset } from '../../redux/order-reducer/action';
//import { getDetailOrdersInitiate, getDetailOrderInitiate } from '../../redux/detailOrder-reducer/action';
import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import {monthsShort} from "moment/moment";
//import {float} from "html2canvas/dist/types/css/property-descriptors/float";
moment.locale('vi')

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
function format2(n, currency) {
    return  n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' '+currency;
}
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const DeliveredInvoiceScr = () => {

    const [state1, setState] = useState(initialState);
    const dispatch = useDispatch();
    const {Promotion, addressCus, costShip, date, dateDelivery, idCus, idOrder, nameCus,
        payment, phoneCus, point, quantity, state, statePayment, totalPayment, totalPrice} = state1;

    const {Orders, Order} = useSelector(state1 =>state1.Orders);
    const detailOrders = useSelector(state1 => state1.DetailOrders.DetailOrders);
    //filer detail order map filter
    function doSomeThing(id) {
        let arr = detailOrders.filter(item => item.idOrder === id);
        return arr;
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const [searchDis, setSearchDis] = useState('');
    const searchText = (event) => {
        setSearchDis(event.target.value);
    };

    let dataSearch = Orders.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchDis.toString().toLowerCase())
        );
    });
    const discountsPerPage = 99;
    const pagesVisited = pageNumber * discountsPerPage;

    let sumAll=0;
    const displayOrders = dataSearch.slice(pagesVisited, pagesVisited + discountsPerPage)
        .map((item,index) => {
            if(item.state === "Thành công"&&monthsShort(item.date,11)==="Dec"){
                sumAll=sumAll+Number(item.totalPayment);
                return(
                    <tbody  key={index} >
                    <tr >
                        <th scope="row">{index}</th>
                        <td>{item.idOrder}</td>
                        <td>{item.nameCus}</td>
                        <td>{item.date}</td>
                        <td>{item.totalPayment}</td>
                        <td>{item.state}</td>
                        <td>
                            <i className="bi bi-eye-fill"
                               style={{color:'blue'}}
                               onClick= {() => handleModal(item.id)}
                            ></i>
                        </td>
                        <td>
                            <i className="bi bi-trash-fill"
                               style={{color:'red'}}
                            ></i>
                        </td>
                    </tr>

                    </tbody>

                );}
        });

    const pageCount = Math.ceil(Orders.length / discountsPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    useEffect(() => {
        dispatch(getOrdersInitiate());
    }, []);

    useEffect(() => {
        if(Order){
            setState({ ...Order});
        }
    },[Order]);

    const editOrder = (id) => {
        dispatch(getOrderInitiate(id));
    };

    const modalBody = (
        <div className="row">
            <div className="col-sm-5" style={{fontWeight:'bold'}}>Mã đơn hàng:</div>
            <div className="col-sm-7">{Order.idOrder}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tên người nhận:</div>
            <div className="col-sm-7">{Order.nameCus}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Số điện thoại:</div>
            <div className="col-sm-7">{Order.phoneCus}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Địa chỉ:</div>
            <div className="col-sm-7">{Order.addressCus}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Số lượng:</div>
            <div className="col-sm-7">{Order.quantity}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Phương thức thanh toán:</div>
            <div className="col-sm-7">{Order.payment}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Điểm tích lũy:</div>
            <div className="col-sm-7">{Order.point}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Trạng thái đơn:</div>
            <div className="col-sm-7">{Order.state}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Trạng thái thanh toán:</div>
            <div className="col-sm-7">{Order.statePayment}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Phí vận chuyển:</div>
            <div className="col-sm-7">{Order.costShip} VND</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Khuyến mãi:</div>
            <div className="col-sm-7">{Order.Promotion}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tổng tiền:</div>
            <div className="col-sm-7">{Order.totalPayment} VND</div>
            <div>
                {
                    doSomeThing(Order.idOrder).map(item => (
                        <div className="row" style={{marginLeft:0,width:490}}>
                            <div className="col-sm-5" ><img src={item.imagePro} width={50} height={50} style={{backgroundColor:"#74C69D", borderRadius:30}}/></div>
                            <div className="col-sm-5" >{item.namePro}</div>
                            <div className="col-sm-2" >{item.quantity}</div>
                        </div>
                    ))
                }
            </div>
            {/* <button title='haha' onClick={() => doSomeThing(Order.idOrder)}/> */}

        </div>
    );
    const handleModal = (id) => {
        setModalOpen(true);
        dispatch(getOrderInitiate(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        dispatch(reset());
    };

    return (
        <div className="backgroundUser" style={{background:'white', padding:20, marginTop:-38}}>
            <h3>Thống kê</h3>
            <div className="row mb-2" >

                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Tìm Kiếm ..."
                           value = {searchDis}
                           onChange = {searchText.bind(this)}
                    />

                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{background:'green',color:'white'}}><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div className="hr" style={{marginTop:15}}></div>
            <br/>
            <div>
                <table className="table table-hover">
                    <thead className="thead-table">
                    <tr id="abc">
                        <th scope="col">STT</th>
                        <th scope="col">Mã Hóa Đơn</th>
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Ngày Thanh Toán</th>
                        <th scope="col">Tổng Tiền</th>
                        <th scope="col">Tình Trạng</th>
                        <th></th>
                        <th></th>
                    </tr>

                    </thead>
                    {displayOrders}

                </table>
                <hr id="liner"/>
                <div id="dthu" >
                    Doanh thu tháng:
                    <select className="form-select" aria-label="Default select example"  >
                        <option selected>Open this select menu</option>
                        <option value="1">Tháng 1 </option>
                        <option value="2">Tháng 2</option>
                        <option value="3">Tháng 3</option>
                    </select>
                </div>
                <div class="tongtien" >
                    <div className="col-sm-12">Tháng: 12</div>
                    <div className="col-sm-12">Quý: 4</div>
                    <div className="col-sm-12">Tổng doanh thu: {format2(sumAll,'VND')}</div>
                </div>
                <ReactPaginate
                    previousLabel={"Trước"}
                    nextLabel={"Sau"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />


            </div>
            {modalOpen && (
                <MDBModal
                    show={modalOpen}
                    tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader style={{background:'green'}}>
                                <MDBModalTitle style={{color:'white'}}>Thông tin đơn hàng</MDBModalTitle>
                                <MDBBtn
                                    color='yellow'
                                    onClick={handleCloseModal}
                                ><i className="bi bi-x-square-fill"></i></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>{modalBody}</MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    style={{background:'red'}}
                                    onClick={handleCloseModal}>
                                    Đóng
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            )}
        </div>
    )
}

export default DeliveredInvoiceScr;
