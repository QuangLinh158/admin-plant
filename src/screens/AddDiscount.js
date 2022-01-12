import React, {useState} from 'react';

import { DateRangePickerComponent} from '@syncfusion/ej2-react-calendars';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addDiscountInitiate} from '../redux/discount-reducer/actions';
const initialState = {
    MaKhuyenMai:"",
    TenKhuyenMai:"",
    KhuyenMaiToiDa:0,
    ChietKhau:0,
    TinhTrangKhuyenMai:"",
    NgayKhuyenMai:""
}

const AddDiscount = () => {

    const startValue:Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    const endValue:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20 );
    const minDate:Date = new Date(new Date().getFullYear(), new Date().getMonth(), 4);
    const maxDate:Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20);

    const [state, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {MaKhuyenMai, TenKhuyenMai, KhuyenMaiToiDa, ChietKhau, TinhTrangKhuyenMai, NgayKhuyenMai} = state;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!MaKhuyenMai || !TenKhuyenMai || !KhuyenMaiToiDa || !ChietKhau || !TinhTrangKhuyenMai || !NgayKhuyenMai){
            setErrorMsg(alert("Vui lòng điền đầy đủ thông tin."));
        }
        else
        {
            dispatch(addDiscountInitiate(state));
            setState({MaKhuyenMai:"", TenKhuyenMai:"", KhuyenMaiToiDa:0, ChietKhau:0, TinhTrangKhuyenMai:"", NgayKhuyenMai:""});
            history.push('/khuyenmai');
            setErrorMsg("");
        }
    };

    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:250,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h4 style={{margin:'auto'}}>Thêm Khuyến Mãi</h4>
            </div>

            <div className="hr"></div>
            
            <form onSubmit={handleSubmit} className="row" style={{marginTop:10,color:'green'}}>
                <div className="col-md-4">
                    <label  className="form-label">Mã Khuyến Mãi</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={MaKhuyenMai}
                        name="MaKhuyenMai"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Tên Khuyến Mãi</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={TenKhuyenMai}
                        name="TenKhuyenMai"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Khuyến Mãi Tối Đa</label>
                    <div className="input-group">
                        <input 
                            type="number" 
                            className="form-control" 
                            value={KhuyenMaiToiDa}
                            name="KhuyenMaiToiDa"
                            onChange={handleInputChange}
                            min={0}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>vnd</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                <br/>
                    <label className="form-label">Chiết Khấu</label>
                    <div className="input-group">
                        <input 
                            type="number" 
                            className="form-control" 
                            value={ChietKhau}
                            name="ChietKhau"
                            onChange={handleInputChange}
                            min={0}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{background:'green',color:'white'}}>%</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Tình Trạng</label>
                    <div className="input-group">
                        <select 
                            type="text"
                            value={`${TinhTrangKhuyenMai ? "Còn hạn" : "Hết hạn"}`}
                            name="TinhTrangKhuyenMai"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02">
                            <option 
                            value="Còn hạn"
                            selected>Còn hạn</option>
                            <option 
                            value="Hết hạn"
                            >Hết hạn</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                <br/>
                    <label className="form-label">Bắt đầu - Kết thúc</label>
                    <DateRangePickerComponent 
                        placeholder="Chọn phạm vi"
                        startDate={startValue}
                        endDate={endValue}
                        min={minDate}
                        max={maxDate}
                        minDays={1}
                        maxDays={30}
                        value={NgayKhuyenMai}
                        name="NgayKhuyenMai"
                        onChange={handleInputChange}
                    ></DateRangePickerComponent>
                </div>
               
                <div className="col-md-4">
                    <br/><br/>
                    <button type="submit" className="btn btn-success btn-block">Tạo</button>
                </div>
                
            </form>
        </div>
    )
}

export default AddDiscount;
