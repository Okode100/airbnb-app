import React from "react";

export default function  SingIn(props){
    return(
        <div class="wrapper">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required>
                <i class='bx bxs-user'></i>
            </div> 
            <div className="input-box">
                <input type="password" required placeholder="Password">
                <i class='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-forgot">
                <label>
                    <input type="checkbox"> Remember me
                </label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <div className="register-link">
                <p>Don't have an account? <a href="#">Register</a></p> 
            </div>
        </form>
    </div>

    )

 }