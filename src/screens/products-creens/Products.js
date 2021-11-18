import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProductInitiate, getOneProductInitiate, getProductInitiate} from '../../redux/product-redux/action';
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

const initialState = {
    MaSp:"",
    TenSp:"",
    TenLoai:"",
    GiaSp:0,
    ImageURL:"",
    MoTaChiTiet:"",
    SoluongSp:0,
    TinhTrang:""
}


const ProductScreen = () => {

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const {MaSp,TenSp,TenLoai,GiaSp,ImageURL,MoTaChiTiet,SoluongSp,TinhTrang} = state;
    const {product_list,product}=useSelector(state =>state.products)
    const [modalOpen, setModalOpen] = useState(false);
    //phan trang
    const [pageNumber, setPageNumber] = useState(0);
    const [searchDis, setSearchDis] = useState('');
    const searchText = (event) => {
        setSearchDis(event.target.value);
    }
    let dataSearch = product_list.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchDis.toString().toLowerCase())
        );
    });

    useEffect(() => {
        dispatch(getProductInitiate());
    }, []);


    const deleteProduct = (id) => {
        if(window.confirm("Bạn muốn xóa loại sản phẩm này không ?")){
            dispatch(deleteProductInitiate(id));
        }
    };
    const updateProduct= (id) => {
        dispatch(getOneProductInitiate(id));
    };

    const modalBody = (
        <div className="row">
            <div className="col-sm-5" style={{fontWeight:'bold'}}>Mã:</div>
            <div className="col-sm-7">{product.MaSp}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tên:</div>
            <div className="col-sm-7">{product.TenSp}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Loai:</div>
            <div className="col-sm-7">{product.TenLoai}(vnd)</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Giá:</div>
            <div className="col-sm-7">{product.GiaSp}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Hình</div>
            <div className="col-sm-7"><img src={product.ImageURL} width={50} height={50}/></div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Mô tả:</div>
            <div className="col-sm-7">{product.MoTaChiTiet}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Số lượng:</div>
            <div className="col-sm-7">{product.SoluongSp}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Trạng thái:</div>
            <div className="col-sm-7">{product.TinhTrang}</div>

        </div>
    );
    const handleModal = (id) => {
        setModalOpen(!modalOpen);
        dispatch(getOneProductInitiate(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="backgroundProduct" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                <Link to="/themsp">
                    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>
                </Link>
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text" className="form-control" placeholder="Tìm Kiếm ..."/>
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
                        <th scope="col">Mã</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hình</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Trạng thái</th>
                        <th></th>
                        <th></th>
                        <th></th>


                    </tr>
                    </thead>
                    {product_list && product_list.map((item, index) => (
                        <tbody key={index}>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.MaSp}</td>
                            <td>{item.TenSp}</td>
                            <td>{item.TenLoai}</td>
                            <td>{item.GiaSp}</td>
                            <td>
                                <img src={item.ImageURL} width={50} height={50}/>
                            </td>
                            <td>{item.MoTaChiTiet}</td>
                            <td>{item.SoluongSp}</td>
                            <td>{item.TinhTrang}</td>

                            <td>
                                <Link to={`/suasp/${item.id}`}>
                                    <i className="bi bi-pencil-square"
                                       style={{color: 'green'}}
                                       onClick={()=>{updateProduct(item.id)}}

                                    ></i>
                                </Link>
                            </td>
                            <td>
                                <i className="bi bi-trash-fill"
                                   style={{color: 'red'}}
                                   onClick={()=>{deleteProduct(item.id)}}

                                ></i>
                            </td>
                            <td>
                                <i className="bi bi-eye-fill"
                                   style={{color: 'blue'}}
                                   onClick= {() => handleModal(item.id)}

                                ></i>
                            </td>
                        </tr>
                        {modalOpen && (
                            <MDBModal
                                show={modalOpen}
                                tabIndex='-1'>
                                <MDBModalDialog>
                                    <MDBModalContent>
                                        <MDBModalHeader style={{background:'green'}}>
                                            <MDBModalTitle style={{color:'white',alignContent:'center'}}>THÔNG TIN SẢN PHẨM</MDBModalTitle>
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
                                                Đóng
                                            </MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal>
                        )}
                        </tbody>
                    ))}
                </table>
            </div>


        </div>
    )
}

export default ProductScreen ;
