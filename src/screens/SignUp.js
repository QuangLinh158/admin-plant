import React,{useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';


const SignUp = ({history}) => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard')
        }
    },[])

    const onSignup = () => {
        setLoading(true);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => history.push('/'))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
      <div style={{display:'flex'}}>
        {/* Backgrounds */}
        <div id="login-bg" className="container-fluid">
          <div className="bg-img" />
          <div className="bg-color" />
        </div>
        {/* End Backgrounds */}
        <div className="container" id="login" style={{margin:'auto'}}>
          <div className="row justify-content-center">
              <div className="col-lg-8">
                  <div className="login" >
                      <h1>Đăng Ký</h1>
              {/* Loging form */}
              <div className="form-group">
                  <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      name="name"
                      type="name"
                      className="form-control"
                      placeholder="Tên Người Dùng"
                  />
              </div>
              <div className="form-group">
                  <input 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      name="email"
                      type="email" 
                      className="form-control" 
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
                      placeholder="Mật Khẩu" 
                  />
              </div>
              <div>
                  <button
                      onClick={onSignup}
                      className="btn btn-lg btn-block btn-success"
                  >
                      { loading ? 'Tạo tài khoản ...' : 'Tạo'}
                  </button>
              </div>
              <div>
                <Link to="/">
                  Đăng Nhập
                </Link>
              </div>
            
            {/* End Loging form */}
            
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default SignUp;
