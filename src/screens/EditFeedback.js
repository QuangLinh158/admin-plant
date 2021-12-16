import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeedbackInitiate } from '../redux/feedBack-reducer/action';

const initialState = {
    anhKhachHang:"",
    idFeedback:"",
    idKhachHang:"",
    idProduct:"",
    ngay:"",
    noiDung:"",
    state:"",
    tenKhachHang:""
}


const EditFeedback = (props) => {

    const [state1, setState] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(null);
    const {anhKhachHang, idFeedback, idKhachHang, idProduct, ngay, noiDung, state, tenKhachHang} = state1;

    const dispatch = useDispatch();
    const history = useHistory();

    const getItemID = (str) => {
        let a = str.split('/');
        return a[2];
    }

    const handleInputChange = (e) => {
        let { name, value} = e.target;
        setState({ ...state1, [name]: value});
    };

    const {Feedbacks, Feedback} = useSelector(state1 =>state1.Feedback);
    
    useEffect(() => {
        getItemID(props.location.pathname);
        if(Feedback){
            setState({ ...Feedback});
        }
     },[Feedback]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = getItemID(props.location.pathname);
        dispatch(updateFeedbackInitiate(id,state1));
        setState({anhKhachHang:"",
        idFeedback:"",
        idKhachHang:"",
        idProduct:"",
        ngay:"",
        noiDung:"",
        state:"",
        tenKhachHang:""});
        history.push('/danhgia/choduyet');
    };


    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-25}}>
            <div style={{background:'green',color:'white',width:400,display:'flex',
                padding:3,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <h5 style={{margin:'auto'}}>Cập Nhật Trạng Thái Đơn Hàng</h5>
            </div>

            <div className="hr"></div>
            
            <form onSubmit={handleSubmit} className="row" style={{marginTop:20,color:'green'}}>
                <div className="col-sm-12" ><img src={Feedback.anhKhachHang} width={50} height={50} style={{backgroundColor:"#74C69D", borderRadius:30}}/></div>

                <div className="col-md-4">
                    <label  className="form-label">Tên Khách Hàng</label>
                    <input 
                        readOnly="readonly"
                        type="text" 
                        className="form-control" 
                        value={tenKhachHang}
                        name="tenKhachHang"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Ngày Đánh Giá</label>
                    <input 
                        readOnly="readonly"
                        type="text" 
                        className="form-control" 
                        value={ngay}
                        name="ngay"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Nội Dung</label>
                        <input 
                            readOnly="readonly"
                            type="text" 
                            className="form-control" 
                            value={noiDung}
                            name="noiDung"
                            onChange={handleInputChange}
                        />
                </div>
                <div className="col-md-4">
                    <br/>
                    <label className="form-label">Trạng Thái</label>
                    <div className="input-group">
                        <select defaultValue=""
                            value={state}
                            name="state"
                            onChange={handleInputChange}
                            className="custom-select" 
                            id="inputGroupSelect02"
                        >
                            <option value="Chờ duyệt">Chờ duyệt</option>
                            <option value="Ẩn">Ẩn</option>
                            <option value="Hiển thị">Hiển thị</option>
                        </select>
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

export default EditFeedback;
