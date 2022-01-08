import React, {useEffect, useState} from 'react';
import {useHistory}  from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addProductInitiate} from '../../../redux/product-redux/action';
import * as assert from "assert";
import {colors} from "@material-ui/core";
import { collection, getDocs } from "firebase/firestore";
import firebase,{storage} from "../../../firebase";
import * as url from "url";
import * as Url from "url";
import {getCateInitiate} from "../../../redux/category-reducer/action";
import {DateRangePickerComponent} from "@syncfusion/ej2-react-calendars";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars/src/datepicker/datepicker.component";


const initialState = {
    MaSp:"",
    TenSp:"",
    TenLoai:"",
    GiaSp:0,
    GiaNhapSp:0,
    ImageURL:"",
    MoTaChiTiet:"",
    SoluongSp:0,
    NgayNhapSp:"",
    TinhTrang:""
}

const AddProductScreen = () => {
    const startValue:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    //const endValue:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20 );
    const minDate:Date = new Date(new Date().getFullYear(), new Date().getMonth(), 4);
    //const maxDate:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20);


    const [image, setImage] = React.useState("");
    const imageRef = React.useRef(null);

    const [selectedCategory,setSelectedCategory] = useState("");

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

    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaSp,TenSp,TenLoai,GiaSp,GiaNhapSp,ImageURL,MoTaChiTiet,SoluongSp,NgayNhapSp,TinhTrang} = state;

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getCateInitiate());
    },[])
    const categories = useSelector(state => state.categories.categories);

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        console.log(name,value)

        setState({ ...state, [name]: value});
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!MaSp || !TenSp|| !TenLoai || !GiaSp || !ImageURL || !MoTaChiTiet||!SoluongSp || !TinhTrang){
            setErrorMsg(alert("Vui lòng điền đầy đủ thông tin"));
        }
        else
        {
            // setState({MaSp:"", TenSp:"", MaLoai:"", GiaSp: 0, ImageURL:url, MoTaChiTiet:"",SoluongSp: 0,TinhTrang: ""});

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

            dispatch(addProductInitiate(state));
            //history.push('/sanpham');
        if(window.alert("Thêm thành công"))
        {

        }

    };}

    const _onCategoriesChange = (name) => {
        setSelectedCategory(name)
    }

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:250,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Thêm sản phẩm</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:10,color:'green'}}>
            <div className='col-md-4'>
                   <div className='img-frame'>
                       <div className="input-group">
                           <br/>
                           {result && <img ref={imageRef} src={result} alt="" height={100} width={100}/>}
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
                

                <div className='col-md-4'>
                    <label  className="form-label">Mã sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaSp}
                        name="MaSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-md-4'>
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenSp}
                        name="TenSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Loại sản phẩm</label>
                    <div className="input-group">
                        <select
                            name="TenLoai"
                            className="input-group"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            {categories.map((item)=> {
                                return (
                                    <option value={item.TenLoai}>{item.TenLoai}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-md-4'>
                    <br/>
                    <label className="form-label">Giá nhập</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            value={GiaNhapSp}
                            name="GiaNhapSp"
                            onChange={handleInputChange}
                            min={0}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>VND</span>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <br/>
                    <label className="form-label">Giá sản phẩm</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            value={GiaSp}
                            name="GiaSp"
                            onChange={handleInputChange}
                            min={0}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>VND</span>
                        </div>
                    </div>
                </div>
                

                <div className='col-md-4'>
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
                </div>

            </div>
                <div className='col-md-4'>
                    <br/>
                    <label className="form-label">Số lượng sản phẩm</label>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            value={SoluongSp}
                            name="SoluongSp"
                            onChange={handleInputChange}
                            min={0}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>Sản phẩm</span>
                        </div>

                    </div>

                </div>
                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Ngày nhập</label>
                    <DatePickerComponent
                        placeholder="Chọn ngày"
                        startDate={startValue}
                        //endDate={endValue}
                        min={minDate}
                        //max={maxDate}
                        minDays={1}
                        maxDays={30}
                        value={NgayNhapSp}
                        name="NgayNhapSp"
                        onChange={handleInputChange}
                    ></DatePickerComponent>
                </div>
                <div className="col-md-4">
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
                <div className='col-md-4'>
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">Tạo</button>
                </div>

            </form>
        </div>
    )
}

export default AddProductScreen;
