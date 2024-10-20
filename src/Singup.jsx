import axios from "axios";
import { useState } from "react";


export function SignUp() {


    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const [isValid, setIsValid] = useState({isMatchedPasswords:'', confirmpassword: '', email: '', password: '', username: '' });

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setTimeout(()=>{
            checkValidations();
        },0)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isChecked = checkValidations();
        if ( isChecked && isValid.email == ''
            && isValid.password == ''
            && isValid.confirmpassword == ''
            && isValid.username == '') {
            singup();
        }
    }


    const singup =()=>{
        let url ='http://localhost:3000/users/singup';
        let body = {
            email:form.email,
            username:form.username,
            password:form.password
        }
        axios.post(url,body).then((response)=>{
            if(response.status==200){
                alert("successfully Singed up");
                window.location.href="/login"
            } else {
                alert(JSON.stringify(response));
            }
        }).catch(err=>{
            alert(err);
        })
    }
    const checkValidations = () => {
        setIsValid({
            isMatchedPasswords: form.password.trim() == form.confirmpassword.trim() ? '':'Invalid',
            email: form.email == null || form.email.length < 8 ? 'invalid' : '',
            password: form.password == null || form.password.length < 8 ? 'Invalid' : '',
            confirmpassword: form.confirmpassword == null || form.confirmpassword.length < 8 ? 'Invalid' : '',
            username: form.username == null || form.username?.length < 6 ? 'Invalid' : ''
        });
        
        return form.password.trim() == form.confirmpassword.trim();
    }

    return (
        <>
            <div className="container">
                <form noValidate onSubmit={handleSubmit}>
                    <h3>Login to the Portal</h3><br />
                    <label>Username</label><br />
                    <input type="text" minLength={6} name="username" placeholder="enter username" onChange={onChangeInputs} /><br/>
                    <label>Email Id</label><br />
                    <input type="email" minLength={8} onChange={onChangeInputs} name="email" placeholder="enter email id" /><br />
                    {isValid?.email !== '' ? <span className="error">Emailid is invalid</span> : ''}<br />
                    <label>Password</label><br />
                    <input type="password" minLength={8} onChange={onChangeInputs} name="password" placeholder="enter password" /><br />
                    {isValid?.password !== '' ? <span className="error">Password is invalid</span> : ''}<br />
                    <label>Confirm Password</label><br />
                    <input type="password" name="confirmpassword" minLength={8} onChange={onChangeInputs} placeholder="enter password" /><br />
                    {isValid?.confirmpassword !== '' ? <span className="error">Confirm Password is invalid</span> : ''}
                    { isValid.isMatchedPasswords!=='' ? <span className="error">Passwords  are not matched</span> : ''}
                    <br />
                    
                    <button type="submit">SIgnup</button>&nbsp;

                </form>
            </div>
        </>
    )


}