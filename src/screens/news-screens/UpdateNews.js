import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import {updateProductInitiate} from "../../../redux/product-redux/action";
//import * as url from "url";
//import {getCateInitiate} from "../../../redux/category-reducer/action";
import {storage} from "../../firebase";
//import {DatePickerComponent} from "@syncfusion/ej2-react-calendars/src/datepicker/datepicker.component";
import {updateNewsInitiate} from "../../redux/news-reducer/action";

const initialState = {
    MaTT:"",
    ImageTTURL:"",
    TenTT:"",
    NoiDungTT:""
}

const UpdateNewScreen = (props) => {

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
    const {MaTT,ImageTTURL,TenTT,NoiDungTT} = state;

    const dispatch = useDispatch();
    const history = useHistory();
    //loai sp


    //loai
    const getItemById = (str) => {
        let a = str.split('/');
        return a[2];
    }

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const {news_list,news}=useSelector(state =>state.news);
    useEffect(() => {
        getItemById(props.location.pathname);
        if(news){
            setState({ ...news});
        }
    },[news]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let id = getItemById(props.location.pathname);
        if(!MaTT||!ImageTTURL||!TenTT||!NoiDungTT ){
           // setErrorMsg(alert("Vui lòng điền đầy đủ thông tin."));
        }
        else
        {
            const uploadTask = storage.storage.ref(`/images_news/${image.name}`).put(image)

            uploadTask.on('state_changed',
                (snapshoty) => {
                    console.log(snapshoty)
                }, (err) => {
                    console.log(e)
                }, () => {
                    storage.storage.ref('images_news').child(image.name).getDownloadURL()
                        .then(url => {
                            return url;
                        })
                        .then((url) => {
                            setState({...state,ImageTTURL: url})
                        })
                })
            dispatch(updateNewsInitiate(id,state));
            //setState({MaSp:"", TenSp:"", TenLoai:"", GiaSp: 0, ImageURL:url, MoTaChiTiet:"",SoluongSp: 0,TinhTrang: ""});

            window.alert("Bạn cập nhật thành công!");
            history.push('/tintuc');

        }
    };
    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:300,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Cập nhật tin tức</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
                <div className='col-md-12'>
                    <label className="form-label">Hình ảnh tin tức</label>
                    <div className="input-group" >
                        <input
                            type="file"
                            defaultValue={state.ImageTTURL}
                            //value={state.ImageURL}
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                uploader(e);

                            }}
                            name="ImageTTURL"
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
                    <label  className="form-label">Mã Tin tức</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaTT}
                        name="MaTT"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Tên tin tức</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenTT}
                        name="TenTT"
                        onChange={handleInputChange}
                    />
                </div>

                <div className='col-md-4'>

                    <label className="form-label">Nội dung</label>
                    <div className="input-group">
                        <input
                            type='text'
                            className="form-control"
                            value={NoiDungTT}
                            name="NoiDungTT"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">Cập nhật</button>
                </div>

            </form>
        </div>
    )
}



export default UpdateNewScreen;
