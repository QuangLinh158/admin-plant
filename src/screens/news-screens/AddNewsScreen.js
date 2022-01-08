import React, {useEffect, useState} from 'react';
import {useHistory}  from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import firebase,{storage} from "../../firebase";
import {addNewsInitiate} from "../../redux/news-reducer/action";



const initialState = {
    MaTT:"",
    ImageTTURL:"",
    TenTT:"",
    NoiDungTT:""
}

const AddNewsScreen = () => {



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

    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaTT,ImageTTURL,TenTT,NoiDungTT} = state;

    const dispatch = useDispatch();
    const history = useHistory();




    const handleInputChange = (e) => {
        let { name, value} = e.target;
        console.log(name,value)

        setState({ ...state, [name]: value});
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!MaTT || !TenTT || !NoiDungTT || !ImageTTURL ){
            setErrorMsg(alert("Vui lòng điền đầy đủ thông tin"));
        }
        else
        {
        //setState({MaSp:"", TenSp:"", MaLoai:"", GiaSp: 0, ImageURL:url, MoTaChiTiet:"",SoluongSp: 0,TinhTrang: ""});

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

        dispatch(addNewsInitiate(state));
        //history.push('/sanpham');
        if(window.alert("Thêm thành công"))
        {

        }

    };}



    return (
        <div className="backgroundProduct" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:250,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Thêm Tin Tức Mới</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:10,color:'green'}}>
                
                <div className='col-md-12'>
                    <label className="form-label">Hình ảnh</label>
                    <div className='col-md-4'>
                    <div className='img-frame'>
                        <div className="input-group">
                            <br/>
                            {result && <img ref={imageRef} src={result} alt="" height={100} width={100}/>}
                        </div>
                    </div>

                </div>
                    <div className="input-group" >
                        <input
                            type="file"
                            defaultValue={state.ImageTTURL}
                            //value={state.ImageURL}
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                uploader(e);

                            }}
                            name="ImageURL"
                        />
                    </div>
                </div>
                

                <div className='col-md-5'>
                    <label  className="form-label">Mã Tin Tức</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaTT}
                        name="MaTT"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-md-5'>
                    <label className="form-label">Tên tin tức</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenTT}
                        name="TenTT"
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className='col-md-5'>
                    <label className="form-label">Nội dung</label>
                        <input
                            type="text"
                            className="form-control"
                            value={NoiDungTT}
                            name="NoiDungTT"
                            onChange={handleInputChange}
                        />

                </div>

                <div className='col-md-5'>
                    <br/>
                    <button type="submit" className="btn btn-success btn-block">Tạo</button>
                </div>

            </form>
        </div>
    )
}

export default AddNewsScreen;
