import React, { Component } from 'react';
import './home.css';
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:false,
            posts:[],
            toSubmit:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push("/login");
        }
    }
    async componentDidMount(){
        axios.get('/auth/posts' ,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res)=>{
            //console.log(res);
            this.setState({posts:res.data.data});
        }).catch((err)=>{
            console.log(err);
        });
    }

    handleChange(e){
        this.setState({
            toSubmit:e.target.value
        });

    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method:'post',
            url:'/auth/post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data:{text:this.state.toSubmit}
        }).then((res)=>{
            //console.log(res);
            if(res.data.status){
                window.location.href='/';
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        
        var post = this.state.posts.map((val , i)=>{
            var name = val.name;
            var pic = val.picture;
            var toReturn = val.posts.map((value , ind)=>{
                var date = new Date(parseInt(value.date , 10));
                return (<div className="postBox" key={ind}>
                        <div className="postHeader">
                            <img className="leftSide img img-thumbnail" src={pic} alt='pp' />
                            <div className='rightSide'>
                                {name.charAt(0).toUpperCase() + name.slice(1)} 
                                <small className="date">{date.toDateString()}</small>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="postMiddle">
                            <div className="postContent">{value.text}</div>
                        </div>
                    </div>
                    );
            })
            return toReturn;
        })
        if(this.state.posts.length===0){
            //post = <div className="noData">No Posts To Show</div>
        }

        return(
            <div className='container'>
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="title">Submit Post</div>
                        <div className="form-group">
                            <label htmlFor="" className="col-sm-2 control-label">Post</label>
                            <div className="col-sm-6">
                                <textarea className="form-control" rows="3" name='toSubmit' type='text' value={this.state.toSubmit} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-2">
                                <input className="btn btn-primary" type='submit' value='Submit' />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="postContainer">
                    {post}
                    
                </div>
            </div>
        );
    }
}

export default Home;