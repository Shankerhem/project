import './App.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
    return (
        <div classNameName="App">
            <Router>
                <Routes>
                    <Route path='/app/login' element={<LoginForm />} />
                    <Route path='/app/Register' element={<RegisterForm/>}/>
                    <Route path='/app/in' element={<Inside />} />
                    <Route path='/' element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;



export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const callApi = async () => {
        const res = await axiosInstance.post("/login/", { "email": email, "pwd": password })
        const jwtToken = res?.data?.jwtToken
        console.log("jwttoken", jwtToken)
        localStorage.setItem("jwtToken", jwtToken)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
        if (res?.status === 200) {
            window.location.href = '/'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError(!error)
            return
        }

        callApi()


    };

    return (
        <div classNameName="container">
            <h1>Login</h1>
            {error && <div>there is some error</div>}
            <form onSubmit={handleSubmit}>
                <div classNameName="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div classNameName="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" classNameName="submit-btn">Login</button>
            </form>
        </div>
    );
};


export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [msg,setMsg] = useState(false);

    const callApi = async () => {
        const res = await axiosInstance.post("/Register/", { "email": email, "pwd": password })
        // const jwtToken = res?.data?.jwtToken
        // console.log("jwttoken", jwtToken)
        // localStorage.setItem("jwtToken", jwtToken)
        // axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
        if (res?.status === 200) {
            setMsg(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError(!error)
            return
        }

        callApi()


    };

    return (
        <div classNameName="container">
            <h1>Register</h1>
            {error && <div>there is some error</div>}
            <form onSubmit={handleSubmit}>
                <div classNameName="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div classNameName="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" classNameName="submit-btn">Register</button>
            </form>
            {
                msg && 
                <div style={{"display":"flex","justifyContent":"center"}}>The user is registered succesfully</div>
            }
        </div>
    );
};











export const Inside = () => {
    return (
        <div>
            the user has succesfully logged in
        </div>
    )
}

export const HomePage = () => {
    const [jwtToken ,setJwt]  = useState(false)
    const [data,setData] = useState()

    useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            setJwt(true)
        }
    },[jwtToken])

    const handleClick = (e) =>{
        e?.preventDefault()
        localStorage.removeItem('jwtToken')
        setJwt(false)
        setData()
    }
    
    const handleTestClick = () =>{
        callTestTokenApi()
    }
    
    const callTestTokenApi = async () =>{
        const res = await axiosInstance.get('/checkToken/')
        if(res?.status === 200){
            setData(res?.data?.user)
        } 
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/'>Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {!jwtToken ? <li className="nav-item">
                                <a className="nav-link" href='/app/Register'>Register</a>
                            </li> : <li className="nav-item">
                                {/* <a className="nav-link" style={{"cursor":"pointer"}} onClick={handleClick}>logout</a> */}
                            </li>  }


                            {!jwtToken ? <li className="nav-item">
                                <a className="nav-link" href='/app/login'>login</a>
                            </li> : <li className="nav-item">
                                <a className="nav-link" style={{"cursor":"pointer"}} onClick={handleClick}>logout</a>
                            </li>  }




                            {jwtToken &&<li>
                                <div className='nav-link' style={{"cursor":"pointer"}} onClick={handleTestClick}>test the token</div>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            { data &&
                <div >
                    <div style={{"display":"flex","justifyContent":"center"}}>The user details are </div>
                    <div style={{"display":"flex","justifyContent":"center"}}>email : <span>{data?.email}</span></div>
                    <div style={{"display":"flex","justifyContent":"center"}}>user id : <span>{data?.userId}</span></div>
                </div>
            }
        </div>
    )
}