import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
 import './in.css'
 import { toast } from 'react-toastify';

const Login = () => {

    const[UserName,UserNameUpdate] = useState('');
    const[password,passwordUpdate] = useState('');

    const usenavigate=useNavigate();

    const proceedLogin = (e)=>{
        e.preventDefault();
        let regobj={UserName,password};
        fetch("http://localhost:54850/api/Authentication/LogIn",{
            method:"POST",
            headers:{'Accept':'application/json','Content-Type':'application/json'},
            body:JSON.stringify({
                UserName : regobj.UserName,
                password : regobj.password
            })
        }).then((res)=>{
            return res.json();
        }).then((resp)=>{
            sessionStorage.setItem('UserName',UserName);
            sessionStorage.setItem('Token',resp.token);
            if(resp.user!=null && resp.token!==null)
            {
                usenavigate('/');
                toast.success('Login Succesfull!!!', {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
            }
            
            else{
                usenavigate('/login');
                alert("Enter valid credentials");
            }
            
            console.log(resp)
        }).catch((err)=>{
            usenavigate('/login')
            console.log("Failed");
        });
    }

  return (
    <div className='homepage'>
    <div className="row" >
       <div className="offset-lg-3 col-lg-6" style={{paddingTop: "150px"}} >
            <form className="container"  onSubmit={proceedLogin}>
                <div className="card" style={{backgroundColor : "lightblue",color:"white"}}>
                    <div className="card-header">
                    <h1 style={{color:"black"}}>User Login</h1>
                    </div>
                    <div className="card-body" style={{backgroundColor : "#13466e"}}>
                                <div className="form-group">
                                    <label>UserName <span className="errmsg">*</span></label>
                                    <input value={UserName} onChange={u=>UserNameUpdate(u.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input type="password" value={password} onChange={u=>passwordUpdate(u.target.value)} className="form-control"></input>
                                </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{marginRight:"10px"}} className="btn btn-primary">Login</button>
                        <Link className="btn btn-success" to={'/register'}>New User</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login