          import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";

          function SignupPage() {


            const {searchParams} = new URL(window.location);
            const emailValue = searchParams.get("email");

            const [email,setEmail] = useState(emailValue || "");
            const [username,setUsername] = useState('');
            const [password,setPassword] = useState('');


            const {signup} = useAuthStore();


            const handleSignup = (e) => {
              e.preventDefault();
             signup({email,username,password});
              
            }

            return (
              <div className="h-screen w-full hero-bg ">
                  <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                      <Link to={"/"}>
                          <img src="/netflix-logo.png" alt="logo" className="w-40 mt-4"/>
                      </Link>
                  </header>

                <div className="flex justify-center align-items-center mt-20 mx-3">
                    <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md ">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Sign up</h1>

                      <form className="space-y-4" onSubmit={handleSignup  }>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                          Email
                        </label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                          placeholder="you@exaple.com"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                          Username
                        </label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                          placeholder="johndoe"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                          Password
                        </label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                          placeholder="*******"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>

                        <button  className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Sign up</button>
                      </form>

                      <div  className="text-gray-300 font-semibold mx-auto p-2">Already Have Account?<Link className="p-1 text-red-400 hover:underline" to={"/login"}>SignIn Here!</Link></div>
                    
                    </div>

                </div>  

              </div>
            )
          }

          export default SignupPage