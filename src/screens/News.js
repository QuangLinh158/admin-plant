import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import {getNewsListInitiate} from '../../redux/news-reducer/action';
import ReactPaginate from 'react-paginate';
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
import {
    deleteNewsInitiate,
    getNewsListInitiate,
    getOneNewsInitiate,
    updateNewsInitiate
} from "../redux/news-reducer/action";

const initialState = {
    MaTT: "",
    ImageTTURL: "",
    TenTT: "",
    NoiDungTT: ""
}


const NewsScreen = () => {

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const {MaTT,ImageTTURL,TenTT,NoiDungTT} = state;
    const {news_list,news}=useSelector(state =>state.news)
    const [modalOpen, setModalOpen] = useState(false);
    //phan trang
    const [pageNumber, setPageNumber] = useState(0);
    const [searchNews, setSearchNews] = useState('');
    const searchText = (event) => {
        setSearchNews(event.target.value);
    }
    let dataSearch = news_list.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchNews.toString().toLowerCase())
        );
    });
    //phan trang
    const news_PerPage = 6;
    const pagesVisited = pageNumber * news_PerPage;
    const displayNews = dataSearch.slice(pagesVisited, pagesVisited + news_PerPage)
        .map((item,index) => {
            return(
                <tbody key={index} >
                <tr >
                    <th scope="row">{index+1}</th>
                    <td>{item.MaTT}</td>
                    <td>
                        <img src={item.ImageTTURL} width={50} height={50}/>
                    </td>
                    <td>{item.TenTT}</td>
                    <td>{item.NoiDungTT}</td>
                    <td>
                        <Link to={`/suatt/${item.id}`}>
                            <i className="bi bi-pencil-square"
                               style={{color:'green'}}
                               onClick= {() => {updateNews(item.id)}}
                            ></i>
                        </Link>
                    </td>
                    <td>
                        <i className="bi bi-trash-fill"
                           style={{color:'red'}}
                           onClick= {() =>deleteNews(item.id)}
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

    const pageCount = Math.ceil(news_list.length /news_PerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }
    //===========================



    useEffect(() => {
        dispatch(getNewsListInitiate());
    }, []);


    const deleteNews = (id) => {
        if(window.confirm("B???n mu???n x??a lo???i s???n ph???m n??y kh??ng ?")){
            dispatch(deleteNewsInitiate(id));
        }
    };
    const updateNews= (id) => {
        dispatch(getOneNewsInitiate(id));
    };

    const modalBody = (
        <div className="row">
            <div className="col-sm-5" style={{fontWeight:'bold'}}>M??:</div>
            <div className="col-sm-7">{news.MaTT}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>H??nh ???nh:</div>
            <div className="col-sm-7">
                <img src={news.ImageTTURL} width={50} height={50}/>
            </div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>T??n:</div>
            <div className="col-sm-7">{news.TenTT}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>N???i dung tin t???c:</div>
            <div className="col-sm-7">{news.NoiDungTT}</div>

        </div>
    );
    const handleModal = (id) => {
        setModalOpen(!modalOpen);
        dispatch(getOneNewsInitiate(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-38}}>

            <div className="row mb-2" >
                <Link to="/themtt">
                    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>
                </Link>
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text"
                           className="form-control"
                           placeholder="T??m Ki???m ..."
                           value = {searchNews}
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
                        <th scope="col">M??</th>
                        <th scope="col">H??nh</th>
                        <th scope="col">T??n</th>
                        <th scope="col">N???i dung</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                    </thead>
                    {displayNews}

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
                {modalOpen && (
                    <MDBModal
                        show={modalOpen}
                        tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader style={{background:'green'}}>
                                    <MDBModalTitle style={{color:'white',alignContent:'center'}}>TH??NG TIN S???N PH???M</MDBModalTitle>
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


        </div>
    )
}

export default NewsScreen ;
