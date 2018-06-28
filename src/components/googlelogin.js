import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './login.css'

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.Login=this.Login.bind(this);
        this.Failed=this.Failed.bind(this);
    }
componentWillMount(){
    if(localStorage.getItem('token')){
        this.props.history.push('/home');
    }
}

    Login(res){
        axios({
            method:'post',
            url:'/auth/google',
            data:{
                token:res.tokenId
            }
        }).then((res)=>{
            //console.log(res);
            if(res.data.status){
                localStorage.setItem('token' , res.data.jwtToken);
                localStorage.setItem('userId' , res.data.userId);
                this.props.history.push('/home');
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    Failed(res){
       // alert('Failed To Login');
       console.log(res);
    }

    render(){
        return(
            <div className="loginForm">
            <GoogleLogin
                clientId="710620814605-1kn827k9f2a6n69qeoqhmvoojek3b2a1.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={this.Login}
                onFailure={this.Failed}
            />
            </div>
        )
    }

}
