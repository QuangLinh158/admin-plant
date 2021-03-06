import React,{useState,useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { formatMs } from '@material-ui/core';
import { invalid } from 'moment';


const Login = ({history}) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const emailRef= useRef();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard')
        }
    },[])

    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push('/dashboard')
            })
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    const sendPass = (email) =>{
      const auth = getAuth();
      return sendPasswordResetEmail(auth, email);
    }
    const forgotPasswordHandler = () => {
      // const email1 = emailRef.current.value;
      if (email)
        sendPass(email).then((email) => {
          emailRef.current.value = "";
        }).catch((err) => {
          alert("Vui lòng kiểm tra email để thay đổi mật khẩu");
        })
      else if(!email)
        alert("Email không tồn tại");
    };


    return (
      <div style={{display:'flex'}} >
        {/* Backgrounds */}
        <div id="login-bg" className="container-fluid">
            <div className="bg-img" />
            <div className="bg-color" />
        </div>
        {/* End Backgrounds */}
        <div className="container" id="login"  style={{margin:'auto'}}>
            <div className="row justify-content-center">
                <div className="col-lg-8 ">
                    <div className="login" >
                        <h1>Đăng Nhập</h1>
              {/* Loging form */}
              
                <div className="form-group">
                  <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Tài Khoản" 
                  />
                </div>
                <div className="form-group">
                  <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Mật Khẩu" 
                  />
                </div>
                <div className="form-check">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <label className="form-check-label" htmlFor="exampleCheck1">Lưu</label>
                  <label className="forgot-password"  onClick={forgotPasswordHandler}>Quên mật khẩu?</label>
                  </div>
                  <br />
                  <button 
                    onClick={onLogin}
                    className="btn btn-lg btn-block btn-success"
                  >
                      {loading ? '...' : 'Vào'}
                  </button>
                  {/* <Link to="/signup">
                        Đăng Ký
                  </Link> */}
                  
                  {/* End Loging form */}
                </div>
            </div>
          </div>
        </div>
      </div>

    )
}

export default Login;
