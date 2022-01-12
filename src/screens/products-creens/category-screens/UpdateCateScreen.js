import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateCateInitiate} from "../../../redux/category-reducer/action";

const initialState = {
    MaLoai:"",
    TenLoai:"",
}

const UpdateCateScreen = (props) => {

    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaLoai,TenLoai} = state;

    const dispatch = useDispatch();
    const history = useHistory();

    const getItemById = (str) => {
        let a = str.split('/');
        return a[2];
    }

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const {categories, category} = useSelector((state) =>state.categories);
    useEffect(() => {
       getItemById(props.location.pathname);
        if(category){
            setState({ ...category});
        }
    },[category]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let id = getItemById(props.location.pathname);
        // if(!MaLoai || !TenLoai ){
        //     setErrorMsg(alert("Vui lòng điền đầy đủ thông tin."));
        // }
        // else
        // {
            dispatch(updateCateInitiate(id,state));
            setState({MaLoai:"", TenLoai:""});
            history.push('/loaisanpham');
        // }
    };
    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:300,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Cập nhật loại sản phẩm</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
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
                    <label className="form-label">Tên Loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenLoai}
                        name="TenLoai"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-4" style={{marginTop:8}}>
                    <br/>
                    <button type="submit" className="btn btn-success btn-block">Cập nhật</button>
                </div>

            </form>
        </div>
    )
}



export default UpdateCateScreen;
