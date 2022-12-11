import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';

function Signup(props) {

    const Routes=(
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">AI Condo Dev </Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" role="presentation"><Link className="nav-link" to="/login"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Login</Link></li>
                <li className="nav-item" role="presentation"><Link className="nav-link" to="/signup"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Signup</Link></li>
                    
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    );

    useEffect(() => {
        document.getElementById('body').style.backgroundColor='#0275d8';
        
    }, [])

    const [user,setUser] =useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        password_repeat:''
    });

    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const submit =(e)=>{
        e.preventDefault();
        const {email,firstname,lastname,password,password_repeat}=user;

        const name=firstname+' '+lastname;
        if(name === ''){
            alert('Name cannot be empty');
            return;
        }

        if(email === '' || password=== ''){
            alert('Email/Password cannot be empty');
            return;
        }

        if(password !== password_repeat){
            alert('Passwords do not match');
            return;
        }
        //https://expertai.herokuapp.com/createuser
        
        //url =https://gabbyblog.herokuapp.com/register
        axios.post('https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register',{
            name,
            email,
            password
        }).then((res)=>{
            console.log(res.data);
            localStorage.setItem('token',res.data.user.token);
            localStorage.setItem('name',res.data.user.name);
            localStorage.setItem('email',res.data.user.email);
            props.history.push('/dashboard');
        }).catch(err=>{
            console.log(err);
            alert('Invalid Credentials ');
        })
    }
    return (
    <div>
    {Routes}
    <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
            <div class="card-body p-0">
                <div class="row">
                    
                    <div class="col-lg-12">
                        
                          <div class="p-5">
                            <div class="text-center">
                                <h4 class="text-dark mb-4">Register</h4>
                            </div>
                            <form class="user" onSubmit={submit}>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="text" id="first_name" placeholder="First Name" name="firstname" onChange={onChange} value={user.firstname}/></div>
                                 </div>
                                 <div class="form-group row">
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="text" id="last_name" placeholder="Last Name" name="lastname" onChange={onChange} value={user.lastname}/></div>
                                </div>
                                <div class="form-group">
                                <div class="col-sm-6 mb-3 mb-sm-0"> <input class="form-control form-control-user" type="email" id="email" aria-describedby="emailHelp" placeholder="Email Address" onChange={onChange} name="email" value={user.email}/></div></div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="password" id="password1" placeholder="Password" onChange={onChange} value={user.passord} name="password"/></div>
                                 </div>
                                 <div class="form-group row">
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="password" id="password2" placeholder="Repeat Password" onChange={onChange} value={user.password_repeat} name="password_repeat"/></div>
                                </div><button class="btn btn-primary btn-primary text-white btn-user" type="submit">Register </button>
                                
                            </form>
                            
                            <div class="text-center"><Link class="small" to="/login">Already member ? Login!</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default Signup;
