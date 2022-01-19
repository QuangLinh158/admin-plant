import React, {useState} from 'react';

import { DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';
import {useHistory}  from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addCateInitiate} from "../../../redux/category-reducer/action";
import {storage} from "../../../firebase";
import {addNewsInitiate} from "../../../redux/news-reducer/action";



const initialState = {
    MaLoai:'',
    TenLoai:'',
    imgLoai:""
}

const AddCate = () => {
   //image processing

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
    const {MaLoai,TenLoai,imgLoai} = state;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };
    const handleSubmit = (e) => {
         e.preventDefault();
        // if(!MaLoai|| !TenLoai||!imgLoai){
        //     setErrorMsg(alert("Vui lòng điền đầy đủ thông tin"));
        // }
        // else
        // {

        const uploadCateImage = storage.storage.ref(`/images_categories/${image.name}`).put(image)

            uploadCateImage.on('state_changed',
            (snapshoty) => {
                console.log(snapshoty)
            }, (err) => {
                console.log(e)
            }, () => {
                storage.storage.ref('images_categories').child(image.name).getDownloadURL()
                    .then(url => {
                        return url;
                    })
                    .then((url) => {
                        setState({...state,imgLoai: url})
                    })
            })

        dispatch(addCateInitiate(state));
        //history.push('/sanpham');
        if(window.alert("Thêm thành công"))
        {

        }


    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:300,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Thêm loại sản phẩm</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{color:'green'}}>
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
                        <br/>
                        <div className="input-group" >
                            <input
                                type="file"
                                defaultValue={state.imgLoai}
                                onChange={(e) => {
                                setImage(e.target.files[0]);
                                uploader(e);

                            }}
                            name="ImageURL"
                            />
                        </div>
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Mã loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaLoai}
                        name="MaLoai"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Tên loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenLoai}
                        name="TenLoai"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-md-4'style={{marginTop:8}} >
                    <label className="form-label"></label>
                    <button  type="submit" className="btn btn-success btn-block">Tạo</button>
                </div>
            </form>
        </div>
    )
}

export default AddCate;
