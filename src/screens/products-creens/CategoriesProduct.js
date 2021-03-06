import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteCatetInitiate, getCateInitiate, getOneCateInitiate} from '../../redux/category-reducer/action';
import moment from 'moment';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";

const initialState = {
    MaLoai: "",
    TenLoai: "",
    imgLoai: ""
}
// tui sua code cai
//dt tui goi video ko dc hu loa ngoaoi roi
const CateScreen = () => {

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const {MaLoai,TenLoai,imgLoai} = state;
    const {categories,category}=useSelector(state =>state.categories)
    const [modalOpen, setModalOpen] = useState(false);
    const handleModal = (id) => {
        setModalOpen(!modalOpen);
        dispatch(getOneCateInitiate(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const [pageNumber, setPageNumber] = useState(0);
    const [searchCate, setSearchCate] = useState('');
    const searchText = (event) => {
        setSearchCate(event.target.value);
    }
    let dataSearch = categories.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchCate.toString().toLowerCase())
        );
    });
    //phan trang
    const cate_PerPage = 10;
    const pagesVisited = pageNumber * cate_PerPage;
    const displayCate = dataSearch.slice(pagesVisited, pagesVisited + cate_PerPage)
        .map((item,index) => {
            return(
                <tbody key={index} >
                <tr >
                    <th scope="row">{index+1}</th>
                    <td><img src={item.imgLoai} height={50} width={50}/></td>
                    <td>{item.MaLoai}</td>
                    <td>{item.TenLoai}</td>

                    <td>
                        <Link to={`/sualoai/${item.id}`}>
                            <i className="bi bi-pencil-square"
                               style={{color:'green'}}
                               onClick= {() => updateCate(item.id)}
                            ></i>
                        </Link>
                    </td>
                    <td>
                        <i className="bi bi-trash-fill"
                           style={{color:'red'}}
                           onClick= {() => deleteCate(item.id)}
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

    const pageCount = Math.ceil(categories.length /cate_PerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }
    useEffect(() => {
        dispatch(getCateInitiate());
    }, []);


     const deleteCate = (id) => {
        if(window.confirm("B???n mu???n x??a lo???i s???n ph???m n??y kh??ng ?")){
            dispatch(deleteCatetInitiate(id));
         }
     };
     const updateCate= (id) => {
         dispatch(getOneCateInitiate(id));
     };

    const modalBody = (
        <div className="row">
            <div className="col-sm-5" style={{fontWeight:'bold'}}>M?? Lo???i:</div>
            <div className="col-sm-7">{category.MaLoai}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>T??n Lo???i:</div>
            <div className="col-sm-7">{category.TenLoai}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>H??nh ???nh:</div>
            <div className="col-sm-7"><img src={category.imgLoai} height={50} width={50}/></div>

        </div>
    );


    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                <Link to="/themloai">
                    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>
                </Link>
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text"
                           className="form-control"
                           placeholder="T??m Ki???m ..."
                           value = {searchCate}
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
                        <th scope="col">H??nh ???nh</th>
                        <th scope="col">M?? lo???i</th>
                        <th scope="col">T??n lo???i</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                    </thead>
                    {displayCate}
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
                                <MDBModalTitle style={{color:'white',alignContent:'center'}}>TH??NG TIN LO???I</MDBModalTitle>
                                <MDBBtn
                                    color='yellow'
                                    onClick={handleCloseModal}
                                ><i class="bi bi-x-square-fill"></i></MDBBtn>
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

export default CateScreen ;
