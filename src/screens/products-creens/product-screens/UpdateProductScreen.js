import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateProductInitiate} from "../../../redux/product-redux/action";
import * as url from "url";
import {getCateInitiate} from "../../../redux/category-reducer/action";
import {storage} from "../../../firebase";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars/src/datepicker/datepicker.component";

const initialState = {
    MaSp:"",
    TenSp:"",
    TenLoai:"",
    GiaNhapSp: 0,
    GiaSp:0,
    ImageURL:"",
    MoTaChiTiet:"",
    SoluongSp:0,
    NgayNhapSp: "",
    TinhTrang:""
}

const UpdateProductScreen = (props) => {
    const startValue:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    //const endValue:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20 );
    const minDate:Date = new Date(new Date().getFullYear(), new Date().getMonth(), 4);
    //const maxDate:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20);
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
    const {MaSp,TenSp,TenLoai,GiaNhapSp,GiaSp,ImageURL,MoTaChiTiet,SoluongSp,NgayNhapSp,TinhTrang} = state;

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
            setErrorMsg(alert("Vui l??ng ??i???n ?????y ????? th??ng tin."));
        }
        else
        {
            // const uploadTask = storage.storage.ref(`/images/${image.name}`).put(image)
            //
            // uploadTask.on('state_changed',
            //     (snapshoty) => {
            //         console.log(snapshoty)
            //     }, (err) => {
            //         console.log(e)
            //     }, () => {
            //         storage.storage.ref('images').child(image.name).getDownloadURL()
            //             .then(url => {
            //                 return url;
            //             })
            //             .then((url) => {
            //                 setState({...state,ImageURL: url})
            //             })
            //     })
            dispatch(updateProductInitiate(id,state));
            setState({MaSp:"", TenSp:"", TenLoai:"", GiaSp: 0, ImageURL:url, MoTaChiTiet:"",SoluongSp: 0,TinhTrang: ""});

            window.alert("B???n c???p nh???t th??nh c??ng!");
            history.push('/sanpham');

        }
    };
    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:300,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>C???p nh???t s???n ph???m</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
            <div className='col-md-12'>
                    <label className="form-label">H??nh ???nh s???n ph???m</label>
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
                    <div className='img-frame'>
                        <div className="input-group">
                            <br/>
                            {result && <img ref={imageRef} src={result} alt="" height={100} width={100}/>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label  className="form-label">M?? lo???i</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaSp}
                        name="MaSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">T??n Lo???i</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenSp}
                        name="TenSp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Lo???i s???n ph???m</label>
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
                    <label className="form-label">Gi?? nh???p</label>
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
                    <label className="form-label">Gi?? b??n</label>
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
                    <label className="form-label">M?? t??? s???n ph???m</label>
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
                <div className='col-md-4'>
                    <br/>
                    <label className="form-label">S??? l?????ng s???n ph???m</label>
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
                            <span className="input-group-text" style={{background:'green',color:'white'}}>S???n ph???m</span>
                        </div>

                    </div>

                </div>
                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Ng??y nh???p</label>
                    <DatePickerComponent
                        placeholder="Ch???n ng??y"
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
                    <label className="form-label">T??nh tr???ng s???n ph???m</label>
                    <div className="input-group">
                        <select
                            type="text"
                            value={`${TinhTrang ? "C??n" : "H???t"}`}
                            name="TinhTrang"
                            onChange={handleInputChange}
                            className="custom-select"
                            id="inputGroupSelect02">
                            <option
                                value="C??n"
                                selected>C??n</option>
                            <option
                                value="H???t"
                            >H???t</option>
                        </select>

                    </div>
                </div>

                <div className="col-md-4">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">C???p nh???t</button>
                </div>

            </form>
        </div>
    )
}



export default UpdateProductScreen;
