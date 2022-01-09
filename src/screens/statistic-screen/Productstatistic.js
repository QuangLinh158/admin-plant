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
import {getSTAInitiatee} from "../../redux/statistic-reducer/action";

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
function format2(n, currency) {
    return  n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+' '+currency;
}
const ProductStScreen = () => {
    //Them doanh thu vao db
    // const {Thang,TongVonNhap,TongDThu,LoiNhuan} = state;
    // const {stas, sta}=useSelector(state =>state.statistics)

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const {MaSp,TenSp,TenLoai,GiaSp,ImageURL,MoTaChiTiet,SoluongSp,TinhTrang} = state;
    const {product_list,product}=useSelector(state =>state.products)
    const [modalOpen, setModalOpen] = useState(false);
    //phan trang
    const [pageNumber, setPageNumber] = useState(0);
    const [searchPro, setSearchPro] = useState('');
    const searchText = (event) => {
        setSearchPro(event.target.value);
    }
    let dataSearch = product_list.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchPro.toString().toLowerCase())
        );
    });
    //tong doanh thu
    let itemtongDt=0;
    let itemVon=0;
    let tongDt=0;
    let tongVon=0;
    let loiNhuanTong=0;
    //phan trang
    const product_PerPage = 6;
    const pagesVisited = pageNumber * product_PerPage;
    const displayPro = dataSearch.slice(pagesVisited, pagesVisited + product_PerPage)
        .map((item,index) => {
            let loiNhuan=(Number(item.GiaSp)-Number(item.GiaNhapSp))*Number(item.SoluongSp);
            itemtongDt=(Number(item.GiaSp)*Number(item.SoluongSp));
            itemVon=(Number(item.SoluongSp)*Number(item.GiaNhapSp));
            tongDt=tongDt+itemtongDt;
            tongVon=tongVon+itemVon;
            loiNhuanTong=loiNhuanTong+loiNhuan;
            return(
                <tbody key={index} >
                <tr >
                    <th scope="row">{index+1}</th>
                    <td >
                        <img src={item.ImageURL} width={50} height={50} style={{backgroundColor:"#74C69D", borderRadius:30}}/>
                    </td>
                    <td>{item.TenSp}</td>
                    <td>{item.GiaNhapSp}</td>
                    <td>{item.GiaSp}</td>
                    <td>{item.SoluongSp}</td>
                    <td>{moment(item.NgayNhapSp[0]).format('MM-DD-YYYY').toString()}</td>
                    <td>{loiNhuan}</td>

                </tr>
                </tbody>
            );
        });

    const pageCount = Math.ceil(product_list.length /product_PerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }
    //===========================



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
            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tháng:</div>
            <div className="col-sm-7">{}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Tên:</div>
            <div className="col-sm-7">{product.TenSp}</div>

            <div className="col-sm-5" style={{fontWeight:'bold'}}>Loại:</div>
            <div className="col-sm-7">{product.TenLoai}(vnd)</div>

        </div>
    );
    const handleModal = (id) => {
        setModalOpen(!modalOpen);
        dispatch(getSTAInitiatee(id));
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="backgroundProduct" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                {/*<Link to="/themsp">*/}
                {/*    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>*/}
                {/*</Link>*/}
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text"
                           className="form-control"
                           placeholder="Tìm Kiếm ..."
                           value = {searchPro}
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
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá nhập</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Ngày nhập</th>
                        <th scope="col">Lợi nhuận</th>

                    </tr>
                    </thead>

                    {displayPro}

                </table>
                <form>
                <table>
                    <tr>
                        <td>

                            <div className="tongtien">
                                <div className="col-sm-12">Tháng: 09</div>
                                <div className="col-sm-12">Quý: 4</div>
                                <div className="col-sm-12">Tổng doanh thu: {format2(tongDt,'VND')}</div>
                                <div className="col-sm-12">Tổng vốn: {format2(tongVon,'VND')}</div>
                                <div className="col-sm-12">Tổng lợi nhuận: {format2(loiNhuanTong,'VND')}</div>
                            </div>

                        </td>
                        <td>

                                <button type="submit" className="btn btn-success btn-block">Lưu</button>
                                <button type="submit" className="btn btn-success btn-block">Xuất excel</button>
                                <button type="submit" className="btn btn-success btn-block">Xuất pdf</button>


                        </td>
                    </tr>



                </table>
                </form>

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

                {modalOpen && (
                    <MDBModal
                        show={modalOpen}
                        tabIndex='-1'>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader style={{background:'green'}}>
                                    <MDBModalTitle style={{color:'white',alignContent:'center'}}>Thông tin thống kê</MDBModalTitle>
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
            </div>
        </div>
    )
}

export default ProductStScreen ;
