import React from 'react';
import IMG from '../assets/Botanical.png';

export default function News() {
    return (
        <div className="backgroundDiscount" style={{background:"white", padding:20, marginTop:-38}}>
            <div className="row mb-2" >
                    <button type="button" className="btn btn-success" style={{marginLeft:15, height:37,background:'green'}}><i className="bi bi-plus-circle"></i></button>
                <div className="input-group" style={{width:300, height:30, marginLeft:15}}>
                    <input type="text" className="form-control" placeholder="Tìm Kiếm ..."/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{background:'green',color:'white'}}><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>

            <div className="hr"></div>
            <br/>

            <div>
            <table className="table table-hover">
                <thead className="thead-table">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Nội Dung</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
               
                    <tbody  >
                    <tr >
                    <th scope="row">1</th>
                    <td> <img src={IMG} alt="img" style={{width:50, height:50}}/></td>
                    <td>Trang Trí Phong Thủy</td>
                    <td>abc...............................................................................</td>
                    <td>
                            <i className="bi bi-pencil-square" 
                            style={{color:'green'}}
                            ></i>
                    </td>
                    <td>
                        <i className="bi bi-trash-fill" 
                        style={{color:'red'}}
                       
                        ></i>
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
