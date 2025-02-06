import {   useState } from 'react';
import {Link} from 'react-router-dom';
import { LogOut, Menu, Search, X} from 'lucide-react';
import {useAuthStore} from '../store/authUser.js';
import { useContentStore } from '../store/content.js';

function NavBar() {
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

    const {user,logout} = useAuthStore();

     const {setContentType } = useContentStore();

  
     

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
 

  return (
    <header className="max-w-6xl relative mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50 ">
            <Link to={"/"}>
                <img src='/ultraflix.jpg' alt='netflixlogo' className='w-32 sm:w-40 bg-transparent border border-none' />
            </Link>

            {/* Desktop navbar items */}
            <div className='hidden sm:flex gap-2 items-center'>

                <Link to={"/"} className='hover:underline' onClick={() => setContentType("movie")}>
                        Movies
                </Link>

                <Link to={"/"} className='hover:underline' onClick={() => setContentType("tv")}>
                        TV Shows
                </Link>

                <Link to={"/history"} className='hover:underline'>
                        Search History
                </Link>

            </div>
        </div>

        <div className='flex gap-4 items-center z-50'>
            <Link to={"/search"}>
                <Search className='size-6 cursor-pointer'/>
            </Link>
            <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer' />
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>
        </div>

        <div className='sm:hidden z-[100]'>
        {isMobileMenuOpen ? <X className='pointer-events-auto  z-[1000] sm:hidden' size={30} onClick={toggleMobileMenu} /> : <Menu  className='pointer-events-auto  z-[1000] sm:hidden' size={30} onClick={toggleMobileMenu} />} 
        </div>
          
        

        {/* Mobile navbar */}
        {isMobileMenuOpen && <div className='w-full transition-all duration-400 sm:hidden mt-4 z-50  bg-black border rounded border-gray-800'>
            <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        Movies
                </Link>

                <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        TV Shows
                </Link>

                <Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        Search History
                </Link>
        </div> }
    </header> 
  )
}

export default NavBar
