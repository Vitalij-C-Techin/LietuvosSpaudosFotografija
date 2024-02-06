


function LoginPage() {
    return (
      <>
         <div id="content" class="full-width">   
            
            <div class="left column">
                
                <h2>Login to your account</h2>
                    <label>
                        Email
                        <input 
                            type="email" 
                            name="email" />
                    </label>
                    <label>
                        Password
                        <input 
                            type="password" 
                            name="password" />
                    </label>
                    <input 
                        type="submit"
                        value="Login" />
                    
                    <a 
                        href="https://www.life-framer.com/password-reset/" 
                        class="um-link-alt">
                        Forgot your password?</a>
                
            </div>

                <div class ="right column">
                    Don't have an Account?	    
                    <a 
                        href="https://www.life-framer.com/password-reset/"
                        class="um-link-alt">
                        Register</a>
                </div>

        </div>
      </>
    );
  }
  
  export default LoginPage;