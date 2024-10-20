import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Login() {

    const [form, setForm] = useState({
        email:'',
        password:''
    })
    const [ isValid, setIsValid] = useState({ email:'',password:''});

    const onChangeInputs =(e)=>{
        const { name, value} = e.target;
        setForm({...form,[name]:value});
        checkValidations();
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        checkValidations();
        if(isValid.email=='' && isValid.password==''){
            login();
        }
        alert(JSON.stringify(form));
    }

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user!==null){
            window.location.href="/home"
        }
    },[])

    const checkValidations = ()=>{
        if((form.email==null || form.email.length<8)
        ){
            
            setIsValid({email:"invalid", password:isValid.password});
        } else {
            setIsValid({email:'',password:isValid.password})
        } 
         if(form.password==null || form.password.length<8){
            setIsValid({email:isValid.email, password:"invalid Password"})
        } else {
            setIsValid({email:isValid.email,password:''})
        }
        
    }

    const login =()=>{
        const { email,password} = form;
        let body ={
            email:email,
            password:password
        }
        axios.post("http://localhost:3000/users/login",body).then((response)=>{
            if(response.status=='200'){
            localStorage.setItem("user",JSON.stringify(response.data));
            window.location.href="/home";
            }else {
                alert("invalid Credentials")
            }
        })
    }

    return (
        <div className="container">
            <form noValidate onSubmit={handleSubmit}>
            <h3>Login to the Portal</h3><br/>
            <label>Email Id</label><br />
            <input type="email" minLength={8} onChange={onChangeInputs} name="email" placeholder="enter email id" /><br/>
            { isValid?.email!=='' ? <span className="error">Emailid is invalid</span> : ''}<br/>
            <label>Password</label><br/>
            <input type="password" minLength={8} onChange={onChangeInputs} name="password" placeholder="enter password" /><br/>
             { isValid?.password!=='' ? <span className="error">Password is invalid</span> : ''}<br/>
            <button type="submit">Login</button>&nbsp;
            <Link to={"/signup"}>Sign Up ?</Link>
            </form>
        </div>
    )
}