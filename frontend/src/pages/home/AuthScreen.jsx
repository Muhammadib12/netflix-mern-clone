import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ChevronRight} from 'lucide-react'
function AuthScreen() {
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleFromSubmit = (e) =>{
        e.preventDefault();
        navigate("/signup?email=" + email);
    }
    
  return (
    <div className="hero-bg relative">

    {/* Nav Bar */}
    <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">

    <img src="/netflix-logo.png" alt="Netflix-logo" className="w-32 md:w-52"/>
    <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">Login</Link>

    </header>

    {/* Hero section */}
       <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
            <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
            <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>

            <form className="flex flex-col md:flex-row gap-4 w-1/2" onSubmit={handleFromSubmit}>

                <input type="text" placeholder="johndoe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded flex-1 bg-black/80 border-grat-700"/>
            
                <button className="bg-red-600 text-xl text-white mx-2 px-2 lg:px-6 py-1 md:py-2  rounded flex justify-center items-center hover:bg-red-700">Get Started 
                    <ChevronRight className="size-8 md:size-10"/></button>
            </form>
        </div>    
             {/* seperator */}
             <div className="h-2 w-full bg-[#232323] " aria-hidden='true'/>

             {/* 1st section */}
             <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-between md:flex-row flex-col px-4 md:px-2">
                        {/* left side */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
                                <p className="text-lg md:text-xl">Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blue-ray players, and more.</p>
                            </div>

                        {/* right side */}
                        <div className="flex-1 relative">
                            <img src="/tv.png" alt="TV" className="mt-4 z-20 relative" />
                            <video  
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                            >
                                <source  src="/hero-vid.m4v" type="video/mp4"
                                />
                            </video>
                        </div>
                </div>
             </div>

             {/* seperator */}
             <div className="h-2 w-full bg-[#232323] " aria-hidden='true'/>


        {/* 2st section */}
        <div  className="py-10 bg-black text-white">
            <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                {/* left side */}
                <div className="flex-1">
                    <div className="relative">
                        <img src="/stranger-things-lg.png" alt="stranger" className="mt-4" />

                        <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
                            w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md p-2
                        ">

                            <img src="/stranger-things-sm.png" alt="stranger things" className="h-full"/>
                            <div className="flex justify-between w-full items-center">
                                <div className="flex flex-col gap-0">
                                    <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                                    <span className="text-sm text-blue-500">Downloading...</span>
                                </div>
                                <img src="/download-icon.gif" alt="download" className="h-12"/>
                            </div>

                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="flex-1 md:text-left text-center">

                    <h1 className="text-4xl font-bold md:text-5xl mt-5">Download yours shows to watch offline</h1>
                    <p className="text-gray-400 mt-6">Save your favorites easily and always have somthing to watch</p>


                </div>
            </div>
        </div>



         {/* seperator */}
         <div className="h-2 w-full bg-[#232323] " aria-hidden='true'/>


    {/* 3rd section */}
    <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-between md:flex-row flex-col px-4 md:px-2">
                        {/* left side */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Watch everywhere</h2>
                                <p className="text-lg md:text-xl">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV</p>
                            </div>

                        {/* right side */}
                        <div className="flex-1 relative overflow-hidden">
                            <img src="/device-pile.png" alt="device image" className="mt-4 z-20 relative " />
                            <video  
                            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/6 z-10  max-w-[63%]"
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                            >
                                <source  src="/video-devices.m4v" type="video/mp4"
                                />
                            </video>
                        </div>
                </div>
             </div>

 {/* seperator */}
 <div className="h-2 w-full bg-[#232323] " aria-hidden='true'/>

 {/* 4rth section */}
    <div className="py-10 bg-black">
            <div className="flex justify-between  max-w-6xl mx-auto items-center text-white flex-col-reverse px-4 md:px-2 md:flex-row">
                
                {/* left */}
                <div className="flex-1 relative">
                    <img src="/kids.png" alt="Enjoy on your TV" className="mt-4"/>
                </div>

                {/* right */}
                <div className="flex-1">

                    <div className="text-center md:text-left text-white">
                        <h1 className="text-3xl font-bold md:text-4xl">Create profiles for kids</h1>
                        <p className="text-gray-400 text-lg md:texl-xl mt-3">Send kids on adventures with their favotite characters in a space made just for them--free with your membership</p>
                    </div>

                </div>

            </div>
    </div>


  


 
    </div>
  )
}

export default AuthScreen