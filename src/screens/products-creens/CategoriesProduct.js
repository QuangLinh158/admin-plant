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

const initialState = {
    MaLoai: "",
    TenLoai: ""
}
// tui sua code cai
//dt tui goi video ko dc hu loa ngoaoi roi
const CateScreen = () => {

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const {MaLoai,TenLoai} = state;
    const {categories,category}=useSelector(state =>state.categories)
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getCateInitiate());
    }, []);


   const deleteCate = (id) => {
        if(window.confirm("Bạn muốn xóa loại sản phẩm này không ?")){
            dispatch(deleteCatetInitiate(id));
         }
     };
     const updateCate= (id) => {
         dispatch(getOneCateInitiate(id));
     };

    // const modalBody = (
    //     <div className="row">
    //         <div className="col-sm-5" style={{fontWeight:'bold'}}>Mã Khuyến Mãi:</div>
    //         <div className="col-sm-7">{discount.MaKhuyenMai}</div>
    //
    //         <div className="col-sm-5" style={{fontWeight:'bold'}}>Tên Khuyến Mãi:</div>
    //         <div className="col-sm-7">{discount.TenKhuyenMai}</div>
    //
    //         <div className="col-sm-5" style={{fontWeight:'bold'}}>Khuyến Mãi Tối Đa:</div>
    //         <div className="col-sm-7">{discount.KhuyenMaiToiDa}(vnd)</div>
    //
    //         <div className="col-sm-5" style={{fontWeight:'bold'}}>Chiết Khấu:</div>
    //         <div className="col-sm-7">{discount.ChietKhau}%</div>
    //
    //         <div className="col-sm-5" style={{fontWeight:'bold'}}>Tình Trạng:</div>
    //         <div className="col-sm-7">{discount.TinhTrangKhuyenMai}</div>
    //
    //     </div>
    // );
    // const handleModal = (id) => {
    //     setModalOpen(!modalOpen);
    //     dispatch(getDiscountInitiatee(id));
    // };
    // const handleCloseModal = () => {
    //     setModalOpen(false);
    // };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                <Link to="/themloai">
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
                        <th scope="col">Mã loại</th>
                        <th scope="col">Tên loại</th>
                        <th scope="col">Sữa</th>
                        <th scope="col">Xóa</th>
                        <th scope="col">Xem</th>

                    </tr>
                    </thead>
                    {categories && categories.map((item, index) => (
                        <tbody key={index}>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.MaLoai}</td>
                            <td>{item.TenLoai}</td>

                            <td>
                                <Link to={`/sualoai/${item.id}`}>
                                    <i className="bi bi-pencil-square"
                                       style={{color: 'green'}}
                                       onClick={()=>updateCate(item.id)}

                                    ></i>
                                </Link>
                            </td>
                            <td>
                                <i className="bi bi-trash-fill"
                                   style={{color: 'red'}}
                                   onClick={()=>deleteCate(item.id)}

                                ></i>
                            </td>
                            <td>
                                <i className="bi bi-eye-fill"
                                   style={{color: 'blue'}}


                                ></i>
                            </td>
                        </tr>
                     </tbody>
                    ))}
                </table>
            </div>


        </div>
    )
}

export default CateScreen ;
