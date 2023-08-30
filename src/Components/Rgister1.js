import React from 'react'
import './in.css'
import image from './image/imgm.jfif'

export default function Rgister1() {
  return (
    <div className='main'>
        <div className='sub-main'>
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
                        <input type="text" placeholder='User Name' className='name'/>
                    </div>
                    <div className='second-input'>
                        <input type="password" placeholder='Password' className='name'/>
                    </div>
                    <div className='login-button'>
                        <button>Login</button>
                    </div>
                
                        <p className='link'>
                            <a href='#'>Sign Up</a>
                        </p>
                    
                </div>
            </div>
        </div>
    </div>
  )
}