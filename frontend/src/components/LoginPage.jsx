


function LoginPage() {
    return (
      <>
        
        <form>
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
                value="submit" />
        </form>

      </>
    );
  }
  
  export default LoginPage;