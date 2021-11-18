import React, {useState} from 'react';

import { DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';
import {useHistory}  from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addCateInitiate} from "../../../redux/category-reducer/action";



const initialState = {
    MaLoai:'',
    TenLoai:''
}

const AddCate = () => {


    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaLoai,TenLoai} = state;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!MaLoai|| !TenLoai){
            setErrorMsg(alert("Please enter all info"));
        }
        else
        {
            dispatch(addCateInitiate(state));
            setState({MaLoai: "",TenLoai: ""});
            history.push('/loaisanpham');
            setErrorMsg("");
        }
    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:250,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Thêm loại sản phẩm</h4>
            </div>

            <div className="hr"></div>

            <form onSubmit={handleSubmit} className="row" style={{marginTop:10,color:'green'}}>
                <div className="col-md-12">
                    <label  className="form-label">Mã loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={MaLoai}
                        name="MaLoai"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Tên loại</label>
                    <input
                        type="text"
                        className="form-control"
                        value={TenLoai}
                        name="TenLoai"
                        onChange={handleInputChange}
                    />
                </div>

                <div className='col-md-12' >
                    <label  className="form-label">Chọn</label>
                    <button type="submit" className="btn btn-success btn-block">Tạo</button>
                </div>
            </form>
        </div>
    )
}

export default AddCate;
