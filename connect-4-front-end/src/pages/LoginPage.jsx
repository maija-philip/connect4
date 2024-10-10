import * as React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    
  return (
        <div>
            <p>Login Page</p>
            <Link to={`/createAccount`}><p>create account</p></Link>
        </div>
    );
}