import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateProductInitiate} from "../../../redux/product-redux/action";
import * as url from "url";
import {getCateInitiate} from "../../../redux/category-reducer/action";
import {storage} from "../../../firebase";

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

const UpdateProductScreen = (props) => {
    //image
    const [image, setImage] = React.useState("");
    const imageRef = React.useRef(null);
    function useDisplayImage() {
        const [result, setResult] = React.useState("");

        function uploader(e) {
            const imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                setResult(e.target.result);
            });

            reader.readAsDataURL(imageFile);
        }

        return { result, uploader };
    }

    const { result, uploader } = useDisplayImage()
    //image
    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaSp,TenSp,TenLoai,GiaSp,ImageURL,MoTaChiTiet,SoluongSp,TinhTrang} = state;

    const dispatch = useDispatch();
    const history = useHistory();
    //loai sp
    const [selectedCategory,setSelectedCategory] = useState("");
    useEffect(() => {
        dispatch(getCateInitiate());
    },[])
    const categories = useSelector(state => state.categories.categories);
    const _onCategoriesChange = (name) => {
        setSelectedCategory(name)
    }
   //loai
    const getItemById = (str) => {
        let a = str.split('/');
        return a[2];
    }

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const {product_list,product}=useSelector(state =>state.products);
    useEffect(() => {
        getItemById(props.location.pathname);
        if(product){
            setState({ ...product});
        }
    },[product]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let id = getItemById(props.location.pathname);
        if(!MaSp||!TenSp||!TenLoai||!GiaSp||!ImageURL||!MoTaChiTiet||!SoluongSp||!TinhTrang ){
            setErrorMsg(alert("Vui lòng điền đầy đủ thông tin."));
        }
        else
        {
            const uploadTask = storage.storage.ref(`/images/${image.name}`).put(image)

            uploadTask.on('state_changed',
                (snapshoty) => {
                    console.log(snapshoty)
                }, (err) => {
                    console.log(e)
                }, () => {
                    storage.storage.ref('images').child(image.name).getDownloadURL()
                        .then(url => {
                            return url;
                        })
                        .then((url) => {
                            setState({...state,ImageURL: url})
                        })
                })
            dispatch(updateProductInitiate(id,state));
            setState({MaSp:"", TenSp:"", TenLoai:"", GiaSp: 0, ImageURL:url, MoTaChiTiet:"",SoluongSp: 0,TinhTrang: ""});
            history.push('/sanpham');
        }
    };
    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:300,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Cập nhật loại sản phẩm</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
                <div className="col-md-12">
                    <label  className="form-label">Mã loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaSp}
                        name="MaSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Tên Loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenSp}
                        name="TenSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12">
                    <br/>
                    <label className="form-label">Loại sản phẩm</label>
                    <select
                        name="TenLoai"
                        className="input-group"
                        onChange={handleInputChange}
                    >
                        {categories.map((item)=> {
                            return (
                                <option value={item.TenLoai}>{item.TenLoai}</option>
                            )
                        })}


                    </select>
                </div>
                <div className='col-md-12'>
                    <br/>
                    <label className="form-label">Giá sản phẩm</label>
                    <div className="input-group">
                        <input
                            type='text'
                            className="form-control"
                            value={GiaSp}
                            name="GiaSp"
                            onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>VND</span>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <br/>
                    <label className="form-label">Hình ảnh sản phẩm</label>
                    <div className="input-group" >


                        <input
                            type="file"
                            defaultValue={state.ImageURL}
                            //value={state.ImageURL}
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                uploader(e);

                            }}
                            name="ImageURL"
                        />

                    </div>

                </div>
                <div className='col-md-12'>
                    <br/>
                    <div className='img-frame'>
                        <div className="input-group">
                            <br/>
                            {result && <img ref={imageRef} src={result} alt="" height={100} width={100}/>}
                        </div>
                    </div>

                </div>
                <div className='col-md-12'>
                    <br/>
                    <label className="form-label">Mô tả sản phẩm</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={MoTaChiTiet}
                            name="MoTaChiTiet"
                            onChange={handleInputChange}
                        />
                        {/*<div className="input-group-append">*/}
                        {/*    <span className="input-group-text" style={{background:'green',color:'white'}}>%</span>*/}
                        {/*</div>*/}
                    </div>

                </div>
                <div className='col-md-12'>
                    <br/>
                    <label className="form-label">Số lượng sản phẩm</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            value={SoluongSp}
                            name="SoluongSp"
                            onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>Sản phẩm</span>
                        </div>

                    </div>

                </div>
                <div className="col-md-12">
                    <br/>
                    <label className="form-label">Tình trạng sản phẩm</label>
                    <div className="input-group">
                        <select
                            type="text"
                            value={`${TinhTrang ? "Còn" : "Hết"}`}
                            name="TinhTrang"
                            onChange={handleInputChange}
                            className="custom-select"
                            id="inputGroupSelect02">
                            <option
                                value="Còn"
                                selected>Còn</option>
                            <option
                                value="Hết"
                            >Hết</option>
                        </select>

                    </div>
                </div>

                <div className="col-md-12">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">Cập nhật</button>
                </div>

            </form>
        </div>
    )
}



export default UpdateProductScreen;
