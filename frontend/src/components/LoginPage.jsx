


function LoginPage() {
    return (
      <>
         <div id="content" class="form" style={{display: "flex", justifyContent: "center" }}>       

            <div class="left-column">

                <div class="form-header">
                    <h2>
                        Login to your account
                    </h2>
                </div>
                
                    <div class="field-label">
                        <label>
                            Email
                            
                        </label>
                    </div>

                    <div class="field-input">
                        <input 
                                    type="email" 
                                    name="email" />
                    </div>
                    
                    <div class="field-label">
                        <label>
                            Password
                        
                        </label>
                    </div>

                    <div class="field-input">
                        <input 
                                type="password" 
                                name="password" />
                    </div>

                    <div class="button-login">
                        <input 
                            type="submit"
                            value="Login" />
                    </div>
                    <div class="link">
                        <a 
                            href="https://www.life-framer.com/password-reset/" 
                            >
                            Forgot your password?</a>
                    </div>
                    
                
            </div>

                <div class ="right column">

                    <div class="form-header">
                        <p>
                            Don't have an Account?
                        </p>
                    </div>

                    <div class="link">
                     <a 
                        href="https://www.life-framer.com/password-reset/"
                        class="um-link-alt">
                        Register</a>
                    </div>
                 
                </div>

        </div>
      </>
    );
  }
  
  export default LoginPage;