import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';


function Navbar(props) {
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    useEffect(()=>{
        if(localStorage.getItem('token') !==null){
            setIsAuthenticated(true);
        }
    },[])

    const logout=()=>{
        // const token=localStorage.getItem('token');
        // const config={
        //     headers:{
        //         'Authorization':`Bearer ${token}`,
        //         'Content-type':'application/json'
        //     }
        // }

        // axios.post('http://localhost:5000/logout',config).then((res)=>{
        //     console.log(res);
            
        //     props.history.push('/');
        // }).catch((err)=>{
        //     console.log(err);
        // })
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        props.history.push('/');
    }
        
        const openRoutes=(
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
            <div className="container-fluid"><Link className="navbar-brand logo" href="/">Reputation Monitor</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
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
    
        var privateRoutes=(
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top text-primary bg-dark portfolio-navbar gradient" >
            <div className="container-fluid"><Link className="navbar-brand logo" href="/">Legal Expert</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse"
                    id="navbarNav">
                    <ul className="nav navbar-nav ml-auto">
                       
                        <li className="nav-item" role="presentation"><Link className="nav-link" to="/dashboard"><i style={{marginRight:'5px'}} className="fa fa-bar-chart"></i>Dashboard</Link></li>
                        <li className="nav-item" role="presentation" onClick={logout}><Link className="nav-link" to="/dashboard"><i style={{marginRight:'5px'}} className="fa fa-user"></i>Logout</Link></li>
                        
                           
            
                        
                        
                        
                        
                        
                        
                        
                    </ul>
                    
                </div>
               
            </div>
        </nav>
        )
        return isAuthenticated?privateRoutes:openRoutes
        
    
}

export default Navbar;
