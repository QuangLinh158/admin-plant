import React from 'react'

export default function ConfirmInvoice() {
    return (
        <div className="backgroundUser" style={{background:'white', padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text" className="form-control" placeholder="Tìm Kiếm ..."/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{background:'green',color:'white'}}><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div className="hr" style={{marginTop:15}}></div>
            <br/>
            <div>
            <table className="table table-hover">
                <thead className="thead-table">
                    <tr id="abc">
                        <th scope="col">STT</th>
                        <th scope="col">Mã Hóa Đơn</th>
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Ngày Thanh Toán</th>
                        <th scope="col">Tình Trạng</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>HD00123</td>
                    <td>Nguyễn Văn Quang Linh</td>
                    <td>31/10/2021</td>
                    <td>Đã Xác Nhận</td>
                    <td>
                        <i className="bi bi-cart-check-fill"
                          style={{color:'green'}}></i>
                    </td>
                    <td>
                        <i className="bi bi-trash-fill"
                            style={{color:'red'}}></i>
                    </td>
                    <td>
                        <i className="bi bi-eye-fill" 
                        style={{color:'blue'}}
                        ></i>
                    </td>
                    </tr>
                    </tbody>
            </table>
            </div>
        </div>
    )
}
