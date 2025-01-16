            import { Search } from "lucide-react"
            import NavBar from "../components/NavBar"
            import {  useState } from "react"
            import { useContentStore } from "../store/content";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";

            function SearchPage() { 
                const [activeTab,setActiveTab] = useState("movie");
                const [results, setResults] = useState([]);
                const [searchTerm,setSearchTerm] = useState("");
                const {setContentType} = useContentStore();


                
            const handleSearch = async (e) => {
                e.preventDefault();
                try{
                    const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
                    const results = res.data.content?.results || []; 
               
                    
                    setResults(results);
                }catch(error){
                    if(error.response.status === 404){
                        toast.error("Nothing found, make sure you are searching under the right category");
                    }else{
                        toast.error("An error ocurred")
                    }
                   
                }   
            } 

            
            


            const handleTapClick = (tab) => {
                setActiveTab(tab);
                tab === "movie" ? setContentType("movie") : setContentType("tv");
                setResults([]);
            }
            
            
            return (
                <div className="h-screen bg-black max-w-full text-white overflow-y-scroll">
                    <NavBar/>
                    <div className="flex justify-center items-center mx-auto mt-4 py-2  gap-2">
                        <button onClick={() => handleTapClick("movie")} className={` ${activeTab === "movie" ? 'bg-red-600' : 'bg-gray-800'}  hover:bg-red-700 rounded px-4 py-2`}>Movies</button>
                        <button onClick={() => handleTapClick("tv")} className={` ${activeTab === "tv" ? 'bg-red-600' : 'bg-gray-800'}  hover:bg-red-700 rounded px-4 py-2`}>TV Shows</button>
                        <button onClick={() => handleTapClick("person")} className={`${activeTab === "person" ? 'bg-red-600' : 'bg-gray-800'}  hover:bg-red-700 rounded px-4 py-2`}>People</button>
                    </div>

                    <form className="flex mb-8 gap-2 max-w-2xl mx-auto mt-4 justify-center items-stretch text-white" onSubmit={handleSearch}>
                        <input value={searchTerm}  onChange={(event) => setSearchTerm(event.target.value)}  type="text"  placeholder={`Search for ${activeTab}`}
            className="bg-gray-700 w-full p-1 focus:none outline-none rounded text-white"/>
                        <button className="bg-red-600 text-white ml-1 p-2 rounded cursor-pointer"><Search className='size-5 cursor-pointer'/></button>
                    </form>  
                

                    <div
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'

            >
                        {results.map((result) => {
                                if(!result.poster_path && !result.profile_path)return null;
                                return (
                                    <div key={result.id} className="bg-gray-800 p-4 rounded h-auto">
                                        {activeTab === "person" ? (
                                            <Link to={"/actor/" + result.name} className="flex flex-col items-center">
                                                <img 
                                                    src={ORIGINAL_IMAGE_BASE_URL + result.profile_path}
                                                    alt={result.name}
                                                    className="max-h-96 rounded mx-auto"
                                                
                                                />

                                                <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                                            </Link>
                                        ) : <Link to={"/watch/" + result.id} className="flex flex-col items-center" onClick={() => {
                                            setContentType(activeTab)
                                        }}>
                                        <img 
                                            src={ORIGINAL_IMAGE_BASE_URL + result?.poster_path}
                                            alt={result.name || result.title}
                                            className="w-full h-96 rounded object-cover"
                                        
                                        />

                                        <h2 className="mt-2 text-xl font-bold">{result?.title || result.name}</h2>
                                    </Link>}
                                    </div>
                                )
                                    
                                
                        })}
                        
                    </div>


                </div>
            )
            }

            export default SearchPage