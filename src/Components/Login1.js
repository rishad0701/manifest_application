import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import image from './image/imgm.jfif'
import home.css;

export default function Login1() {

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
    <div className='main'>
        <div className='sub-main'>
        <form className="container"  onSubmit={proceedLogin}>
            <div>
                <div className='imgs'>
                    <div className='container-imgs'>
                        <div className='container-image'>
                            <img src={image} alt="image" className='profile' />
                        </div>

                    </div>
                </div>
                <div>
                    <h1>Login Page</h1>
                    <div>
                        <input type="text" placeholder='User Name' value={UserName} onChange={u=>UserNameUpdate(u.target.value)} className='name'/>
                    </div>
                    <div className='second-input'>
                        <input type="password" placeholder='Password' value={password} onChange={u=>passwordUpdate(u.target.value)} className='name'/>
                    </div>
                    <div className='login-button'>
                        <button type="submit">Login</button>
                    </div>
                
                        <p className='link'>
                            <a to={'/register'}>Sign Up</a>
                        </p>
                    
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}
