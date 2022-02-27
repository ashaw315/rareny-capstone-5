import React, {useState} from "react";
import SignUpForm from '../components/SignUpForm'


function SignUp({ setUser }) {

    return(
        <div>
            <p>This is SignUp</p>
            <SignUpForm setUser={setUser}/>
        </div>
    )
}

export default SignUp
