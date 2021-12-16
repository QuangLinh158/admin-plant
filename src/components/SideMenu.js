import React, {useState,useEffect} from 'react'
import logo from '../assets/logoPlants.jpg'
//import IMG_3505 from '../assets/IMG_3505.jpeg'
import MenuItem from './MenuItem';

//import { getAuth, signOut } from '@firebase/auth';


//=================== file dùng để tạo sidebarMenu =======================

const menuItems = [
    {name: 'Khách Hàng', exact: true, to: '/khachhang', iconClassName: 'bi bi-people-fill'},
    {name: 'Tin Tức', to:'/tintuc', iconClassName:'bi bi-newspaper'},
    {name: 'Loại Sản Phẩm', to:'/loaisanpham', iconClassName:'bi bi-collection-fill'},
    {name: 'Sản Phẩm', to:'/sanpham', iconClassName:'bi bi-bag-fill'},
    {name: 'Khuyến Mãi', to:'/khuyenmai', iconClassName:'bi bi-tags-fill'},
    // {name: 'Hóa Đơn', to:'/hoadon', iconClassName:'bi bi-cash-stack'},
    {name: 'Thống Kê', to:'/thongke', iconClassName:'bi bi-reception-4'},
    {
        name: 'Đánh Giá',
        exact: true, 
        to:'/danhgia',
        iconClassName:'bi bi-chat-square-text-fill',
        subMenus:[{name:"Chờ Duyệt", to: '/danhgia/choduyet'},
        {name:"Hiển Thị", to: '/danhgia/hienthi'},
        {name:'Ẩn', to: '/danhgia/an'}]
    },
    {
        name: 'Trạng Thái Đơn',
        exact: true, 
        to:'/trangthaidon',
        iconClassName:'bi bi-check-square-fill',
        subMenus:[{name:'Chưa xác nhận', to: '/trangthaidon/cxn'},
        {name:"Đã xác nhận", to: '/trangthaidon/dxn'},
        {name:'Đang giao', to: '/trangthaidon/dg'},
        {name:'Đơn đã giao', to: '/trangthaidon/ddg'},
        {name:'Đơn đã hủy', to: '/trangthaidon/ddh'}]
    }
];


 const SideMenu = (props, {history}) => {
     //trạng thái sidebarMenu
    const [inactive, setInactive] = useState(false);

    //được sdung cho dropdownList của trạng thái hóa đơn.
    useEffect(() => {
        if(inactive){
            document.querySelectorAll('.sub-menu').forEach(el => {
                el.classList.remove("active");
            })
        }
        props.onCollapse(inactive);
    }, [inactive]);

    //Logout
    // const logout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             localStorage.removeItem('token')
    //             history.push('/')
    //         })
    //         .catch((e) => alert(e.message))
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (!token) {
    //         history.push('/')
    //     }
    // },[])

    // const auth = getAuth();
    // const user = auth.currentUser;


    return (
        <div className={ `side-menu ${inactive ? "inactive" : ""}`}>
            {/* { chỗ này là header của sidebarMenu} */}
            <div className="top-section">
                <div className="logo">
                    <img src={logo} alt="bonsai"/>
                </div>
                <div 
                onClick={() => {setInactive(!inactive);}}
                className="list-task-btn">
                   {inactive ? (<i className="bi bi-list-ul" style={{color:"#33691e"}}></i>) :
                    (<i className="bi bi-list-task" style={{color:'white'}}></i>)}
                </div>
            </div>

            {/* { chỗ này chỉ là thanh ngang phân biệt giữa header và mainMenus} */}
            <div className="divider">
            </div>
            
            {/* { chỗ này thì là mainMenus của sidebar} */}
            <div className="main-menu">
                <ul>
                    {
                        menuItems.map((menuItem, index) => (
                        <MenuItem 
                        key={index}
                        name={menuItem.name}
                        exact={menuItem.exact}
                        to={menuItem.to} 
                        subMenus={menuItem.subMenus || []}
                        iconClassName={menuItem.iconClassName}
                        onClick={() => {
                            if(inactive){
                                setInactive(false);
                            }
                        }}
                        />))
                    }
                    {/* {note} */}
                </ul>
            </div>
            
            {/* {chỗ này là chỉnh user} */}
            {/* <div className="side-menu-footer">
                <div className="avatar">
                    <img src={IMG_3505} alt="user"/>
                </div>
                <div className="user-info">
                    <h5>{user && user.displayName}</h5>
                    <div className="row">
                        <p>{ user && user.email}</p>
                        <i 
                            onClick={logout}
                            className="bi bi-box-arrow-right"
                        ></i>
                    </div>
                    
                </div>
            </div> */}

        </div>
    )
}

export default SideMenu;