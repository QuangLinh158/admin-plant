import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersInitiate, getUserInitiate, reset } from '../redux/user-reducer/action';
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
    address:"",
    birthday:"",
    email:"",
    gender:"",
    idUser:"",
    image:"",
    name:"",
    phoneNumber:"",
    point:""
}

const Users = () => {

    const [state1, setState] = useState(initialState);

    const dispatch = useDispatch();

    const {address, birthday, email, gender, idUser, image, name, phoneNumber, point} = state1;

    const {Users, User} = useSelector(state1 =>state1.Users);

    const [modalOpen, setModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const [searchDis, setSearchDis] = useState('');
    const searchText = (event) => {
        setSearchDis(event.target.value);
    };

    let dataSearch = Users.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchDis.toString().toLowerCase())
            );
    });

    const discountsPerPage = 9;
    const pagesVisited = pageNumber * discountsPerPage;
   

    const displayUsers = dataSearch.slice(pagesVisited, pagesVisited + discountsPerPage)
    .map((item,index) => {
        return(
        <tbody  key={index} >
            <tr >
            <th scope="row">{index+1}</th>
            <td >
                <img src={item.image} width={50} height={50} style={{borderRadius:30}}/>
            </td>
            <td>{item.name}</td>
            <td>{item.birthday}</td>
            <td>{item.gender}</td>
            <td>{item.phoneNumber}</td>
            <td>
                <i className="bi bi-eye-fill"
                style={{color:'blue'}}
                onClick={() => handleModal(item.id)}
                ></i>
            </td>
            </tr>
        </tbody>
        );
    });

    const pageCount = Math.ceil(Users.length / discountsPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    useEffect(() => {
        dispatch(getUsersInitiate());
    }, []);

    useEffect(() => {
        if(User){
            setState({...User});
        }
     },[User]);
    
    
    // const editFeedback = (id) => {
    //     dispatch(getFeedbackInitiate(id));
    // };

    const modalBody = (
        <div className="row">
            <div className="col-sm-12" >
                <img src={User.image} width={50} height={50} style={{borderRadius:30}}/>
            </div>
            
            <div className="col-sm-5" style={{fontWeight:'bold'}}>M?? kh??ch h??ng:</div>
            <div className="col-sm-7">{User.idUser}</div>
            
            <div className="col-sm-5" style={{fontWeight:'bold'}}>T??n kh??ch h??ng:</div>
            <div className="col-sm-7">{User.name}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Gi???i t??nh:</div>
            <div className="col-sm-7">{User.gender}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Ng??y sinh:</div>
            <div className="col-sm-7">{User.birthday}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>?????a ch???:</div>
            <div className="col-sm-7">{User.address}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>??i???m t??ch l??y:</div>
            <div className="col-sm-7">{User.point}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Email:</div>
            <div className="col-sm-7">{User.email}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>S??? ??i???n tho???i:</div>
            <div className="col-sm-7">{User.phoneNumber}</div>
            
            
        </div>
    );
    const handleModal = (id) => {
        setModalOpen(true);
        dispatch(getUserInitiate(id));
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
                        placeholder="T??m Ki???m ..."
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
                        <th scope="col">H??nh ???nh</th>
                        <th scope="col">T??n</th>
                        <th scope="col">Ng??y Sinh</th>
                        <th scope="col">Gi???i T??nh</th>
                        <th scope="col">S??? ??i???n Tho???i</th>
                        <th></th>
                    </tr>
                </thead>
                    {displayUsers}
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
                                    <MDBModalTitle style={{color:'white'}}>Th??ng tin kh??ch h??ng</MDBModalTitle>
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
export default Users;
