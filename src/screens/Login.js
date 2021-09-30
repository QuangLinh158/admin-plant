import React from 'react'

export default function Login() {
    return (
      <div>
      {/* Backgrounds */}
      <div id="login-bg" className="container-fluid">
        <div className="bg-img" />
        <div className="bg-color" />
      </div>
      {/* End Backgrounds */}
      <div className="container" id="login">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="login">
              <h1>Đăng Nhập</h1>
              {/* Loging form */}
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tài Khoản" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Mật Khẩu" />
                </div>
                <div className="form-check">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <label className="form-check-label" htmlFor="exampleCheck1">Lưu</label>
                  <label className="forgot-password"><a>Quên mật khẩu?</a><a /></label><a>
                  </a></div><a>
                  <br />
                  <button type="submit" className="btn btn-lg btn-block btn-success">Vào</button>
                  {/* End Loging form */}
                </a></form></div><a>
            </a></div><a>
          </a></div><a>
        </a></div><a>
      </a></div>
    )
}
