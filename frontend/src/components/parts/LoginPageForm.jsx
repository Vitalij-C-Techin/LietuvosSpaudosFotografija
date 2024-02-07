


function LoginPageForm() {
    return (
      <>
         <div 
         className="container">       
          
            <div 
            className="left-column">
             
                <div 
                className="form">
                
                        <div 
                        className="form-header">
                            <h2>
                                Login to your account
                            </h2>
                        </div>
                    
                        <div 
                        className="field-label">
                            <label>
                                Email
                                
                            </label>
                        </div>

                        <div 
                        className="field-input">
                            <input 
                                        className="field"
                                        type="email" 
                                        name="email" />
                        </div>
                        
                        <div 
                        className="field-label">
                            <label>
                                Password
                            
                            </label>
                        </div>
                      
                        <div 
                        className="field-input">
                            <input 
                                className="field"
                                    type="password" 
                                    name="password" />
                        </div>
                        <div 
                        className="link"
                        style={{display:"block"}}>
                            <a 
                                href="" 
                                >
                                Forgot your password?</a>
                        </div>
                        <div 
                        className="link"
                        style={{display:"block"}}>
                            <a 
                                href=""
                            >
                                Register</a>
                            </div>
                        <div 
                        className="button-login" style={{display:"block"}}>
                            <input 
                             
                                type="submit"
                                value="Login" />
                        </div>
                   
                     
                </div>
            </div>

        </div>
      </>
    );
  }
  
  export default LoginPageForm;