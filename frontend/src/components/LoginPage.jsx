
import './LoginPage.css'

function LoginPage() {
    return (
      <>
         <div className="container">       
          
            <div className="left-column">
                <div className="form">
                        <div className="form-header">
                            <h2>
                                Login to your account
                            </h2>
                        </div>
                    
                        <div className="field-label">
                            <label>
                                Email
                                
                            </label>
                        </div>

                        <div className="field-input">
                            <input 
                                        type="email" 
                                        name="email" />
                        </div>
                        
                        <div className="field-label">
                            <label>
                                Password
                            
                            </label>
                        </div>
                      
                        <div className="field-input">
                            <input 
                                    type="password" 
                                    name="password" />
                        </div>
                       
                        <div className="button-login">
                            <input 
                                type="submit"
                                value="Login" />
                        </div>
                        <div className="link">
                            <a 
                                href="https://www.life-framer.com/password-reset/" 
                                >
                                Forgot your password?</a>
                        </div>
                    
                </div>
            </div>

                <div className ="right-column" style={{}}>
                    <div className="text-wrapper" style={{borderStyle:"solid"}}>
                        <div className="form-header">
                            <p>
                                Don't have an Account?
                            </p>
                        </div>

                        <div className="link">
                        <a 
                            href="https://www.life-framer.com/password-reset/"
                           >
                            Register</a>
                        </div>
                    </div>
                    
                 
                </div>

        </div>
      </>
    );
  }
  
  export default LoginPage;