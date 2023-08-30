import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './in.css'

const Register = () => {

    const [UserName,usernamechange] = useState("");
    const [Email,emailchange] = useState("");
    const [password,passwordchange] = useState("");

    const navigate = useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        let regobj={UserName,Email,password};
        console.log(regobj);
        fetch("http://localhost:54850/api/Authentication/SignUp",{
            method:"POST",
            headers:{'Accept':'application/json','Content-Type':'application/json'},
            body:JSON.stringify({
                userName : regobj.UserName,
                email : regobj.Email,
                password : regobj.password
            })
        }).then((res)=>{
            console.log(res);
            if(res.status===200)
            {
            navigate('/login')
            alert("registered succesfully")           
            }
            else if(res.message==="user already exist"){
                alert("User already exists")
            }
            else{
                alert("enter valid creds")
            }

        }).catch((err)=>{
            console.log("Failed")
        });
    }

    const back=(x)=>{
        navigate('/login')
    }

  return (
    <div className='homepage'>
        <div className="offset-lg-3 col-lg-6" style={{paddingTop: "150px"}}>
            <form className="container" onSubmit={handlesubmit}>
                <div className="card" style={{backgroundColor : "lightblue",color:"white"}}>
                    <div className="card-header" >
                    <h1 style={{color:"black"}}>User Registration</h1>
                    </div>
                    <div className="card-body" style={{backgroundColor : "#13466e"}}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>UserName <span className="errmsg">*</span></label>
                                    <input value={UserName} onChange={u=>usernamechange(u.target.value)} type="text"  className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Email<span className="errmsg">*</span></label>
                                    <input value={Email} onChange={u=>emailchange(u.target.value)} type="text"  className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Password<span className="errmsg">*</span></label>
                                    <input value={password} onChange={u=>passwordchange(u.target.value)}  type="password" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{justifyContent : "center"}}>
                        <button disabled={UserName===''||Email===''||password===''} type="submit" className="btn btn-primary" style={{marginRight : "10px"}}>Register</button>
                        <a onClick={back} className="btn btn-danger">Back</a>
                    </div>
                </div>
            </form>

        </div>
    </div>
  )
}

export default Register