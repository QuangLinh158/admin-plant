import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountInitiate, deleteDiscountInitiate, getDiscountInitiatee, reset } from '../redux/discount-reducer/actions';
import moment from 'moment';
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

moment.locale('vi')
const initialState = {
    MaKhuyenMai:"",
    TenKhuyenMai:"",
    KhuyenMaiToiDa:0,
    ChietKhau:0,
    TinhTrangKhuyenMai:"",
    NgayKhuyenMai:""
}

const Discount = () => {
    
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const {MaKhuyenMai, TenKhuyenMai, KhuyenMaiToiDa, ChietKhau, TinhTrangKhuyenMai, NgayKhuyenMai} = state;
    const {discounts, discount} = useSelector(state =>state.discounts);
    const [modalOpen, setModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const [searchDis, setSearchDis] = useState('');
    const searchText = (event) => {
        setSearchDis(event.target.value);
    }
    let dataSearch = discounts.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchDis.toString().toLowerCase())
            );
    });

    const discountsPerPage = 9;
    const pagesVisited = pageNumber * discountsPerPage;
    
    const displayDiscounts = dataSearch.slice(pagesVisited, pagesVisited + discountsPerPage)
    .map((item,index) => {
    return(
        <tbody key={index} >
        <tr >
        <th scope="row">{index+1}</th>
        <td>{item.TenKhuyenMai}</td>
        <td>{item.ChietKhau}%</td>
        <td>{moment(item.NgayKhuyenMai[0].seconds * 1000).format('MM-DD-YYYY').toString()}</td>
        <td>{moment(item.NgayKhuyenMai[1].seconds * 1000).format('MM-DD-YYYY').toString()}</td>
        <td>
            <Link to={`/suakm/${item.id}`}>
                <i className="bi bi-pencil-square" 
                style={{color:'green'}}
                onClick= {() => editDiscount(item.id)}
                ></i>
           </Link>
        </td>
        <td>
            <i className="bi bi-trash-fill" 
            style={{color:'red'}}
            onClick= {() => deleteDiscount(item.id)}
            ></i>
        </td>
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

    const pageCount = Math.ceil(discounts.length / discountsPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    useEffect(() => {
        dispatch(getDiscountInitiate());
    }, []);

    useEffect(() => {
        if(discount){
            setState({ ...discount});
        }
     },[discount]);

    const deleteDiscount = (id) => {
        if(window.confirm("B???n mu???n x??a khuy???n m??i ?")){
            dispatch(deleteDiscountInitiate(id));
        }
    };
    const editDiscount = (id) => {
        dispatch(getDiscountInitiatee(id));
    };

    const modalBody = (
        <div className="row">
            <div className="col-sm-5" style={{fontWeight:'bold'}}>M?? Khuy???n M??i:</div>
            <div className="col-sm-7">{discount.MaKhuyenMai}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>T??n Khuy???n M??i:</div>
            <div className="col-sm-7">{discount.TenKhuyenMai}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Khuy???n M??i T???i ??a:</div>
            <div className="col-sm-7">{discount.KhuyenMaiToiDa}(vnd)</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Chi???t Kh???u:</div>
            <div className="col-sm-7">{discount.ChietKhau}%</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>T??nh Tr???ng:</div>
            <div className="col-sm-7">{discount.TinhTrangKhuyenMai}</div>
        </div>
    );
    const handleModal = (id) => {
        setModalOpen(true);
        dispatch(getDiscountInitiatee(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        dispatch(reset());
    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                <Link to="/themkm">
                    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>
                </Link>
                
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text"
                           className="form-control"
                           placeholder="T??m Ki???m ..."
                           value = {searchDis}
                           onChange = {searchText.bind(this)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{background:'green',color:'white'}}><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>

            <div className="hr"></div>
            <br/>

            <div>
            <table className="table table-hover">
                <thead className="thead-table">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">T??n</th>
                        <th scope="col">Chi???t Kh???u</th>
                        <th scope="col">B???t ?????u</th>
                        <th scope="col">K???t Th??c</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                {displayDiscounts}
                
            </table>
            <ReactPaginate 
                    previousLabel={"Tr?????c"}
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
                                    <MDBModalTitle style={{color:'white'}}>Th??ng tin khuy???n m??i</MDBModalTitle>
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
                                        ????ng
                                    </MDBBtn>
                                </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                    )}
        </div>
    )
}

export default Discount;
