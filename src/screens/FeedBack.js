import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacksInitiate, getFeedbackInitiate, reset } from '../redux/feedBack-reducer/action';
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
import { Button } from '@material-ui/core';

const initialState = {
    anhKhachHang:"",
    idFeedback:"",
    idKhachHang:"",
    idProduct:"",
    ngay:"",
    noiDung:"",
    state:"",
    tenKhachHang:""
}

const FeedBack = () => {

    const [state1, setState] = useState(initialState);

    const dispatch = useDispatch();

    const {anhKhachHang, idFeedback, idKhachHang, idProduct, ngay, noiDung, state, tenKhachHang} = state1;

    const {Feedbacks, Feedback} = useSelector(state1 =>state1.Feedback);

    const [modalOpen, setModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const [searchDis, setSearchDis] = useState('');
    const searchText = (event) => {
        setSearchDis(event.target.value);
    };

    let dataSearch = Feedbacks.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchDis.toString().toLowerCase())
            );
    });

    const discountsPerPage = 9;
    const pagesVisited = pageNumber * discountsPerPage;
   

    const displayFeedbacks = dataSearch.slice(pagesVisited, pagesVisited + discountsPerPage)
    .map((item,index) => {
        return(
        <tbody  key={index} >
            <tr >
            <th scope="row">{index+1}</th>
            <td>{item.tenKhachHang}</td>
            <td>{item.noiDung}</td>
            <td>{item.ngay}</td>
            <td>{item.state}</td>
            <td>
                <i className="bi bi-eye-fill"
                style={{color:'blue'}}
                onClick= {() => handleModal(item.id)}
                ></i>
            </td>
            </tr>
        </tbody>
        );
    });

    const pageCount = Math.ceil(Feedbacks.length / discountsPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    useEffect(() => {
        dispatch(getFeedbacksInitiate());
    }, []);

    useEffect(() => {
        if(Feedback){
            setState({ ...Feedback});
        }
     },[Feedback]);

    const editFeedback = (id) => {
        dispatch(getFeedbackInitiate(id));
    };

    const modalBody = (
        <div className="row">
            <div className="col-sm-12" ><img src={Feedback.anhKhachHang} width={50} height={50} style={{backgroundColor:"#74C69D", borderRadius:30}}/></div>
            
            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tên khách hàng:</div>
            <div className="col-sm-7">{Feedback.tenKhachHang}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Ngày đánh giá:</div>
            <div className="col-sm-7">{Feedback.ngay}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Nội dung:</div>
            <div className="col-sm-7">{Feedback.noiDung}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Trạng thái:</div>
            <div className="col-sm-7">{Feedback.state}</div>
            
            {/* <div>
            {
                doSomeThing(Order.idOrder).map(item => (
                    <div className="row" style={{marginLeft:0,width:490}}>
                        <div className="col-sm-5" ><img src={item.imagePro} width={50} height={50} style={{backgroundColor:"#74C69D", borderRadius:30}}/></div>
                        <div className="col-sm-5" >{item.namePro}</div>
                        <div className="col-sm-2" >{item.quantity}</div>
                    </div>
                ))
            }
            </div> */}
        </div>
    );
    const handleModal = (id) => {
        setModalOpen(true);
        dispatch(getFeedbackInitiate(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        dispatch(reset());
    };



    return (
        <div className="backgroundUser" style={{background:'white', padding:20, marginTop:-38}}>
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
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Nội Dung</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Tình Trạng</th>
                        <th></th>
                    </tr>
                </thead>
                    {displayFeedbacks}
            </table>
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
export default FeedBack;
