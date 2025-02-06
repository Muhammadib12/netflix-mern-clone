import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import axios from "axios";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/functions";
import {  Trash } from "lucide-react";
import toast from "react-hot-toast";


function HistoryPage() {


     const [history,setHistory] = useState([]);
    
    const handleDelete =  async (id) => {
        try{
            await axios.delete(`/api/v1/search/history/${id}`);
            setHistory(history.filter((item) => item.id !== id));
        }catch(e){
            console.log(e.message);
            
            toast.error("Failed to delete search item")
            
        }
    }

    useEffect(() => {
        const gitHistory = async () => {
            try{
                const res = await axios.get("/api/v1/search/history");
                setHistory(res.data.content);
                console.log(history);
            }catch(e){
                console.log(e.message);                
                setHistory([]);
            }
        };

        gitHistory();
    },[])


    if(history?.length === 0) return(
        <div className="min-h-screen bg-black text-white">
            <NavBar/>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mg-8">Search History</h1>
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl">No search history found!!</p>
                </div>
            </div>
        </div>
    )

  return (
    <div className="min-h-screen bg-black text-white">
        <NavBar/>

        <div className="max-w-6xl mx-auto items-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Search History</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history?.map((entry) => {
                    return(
                    <div key={entry.id} className="bg-gray-800 p-4 rounded flex items-start">
                        <img src={SMALL_IMAGE_BASE_URL + entry?.image} alt="SearchHisstoryImage" className="size-16 rounded-full object-cover mr-4"/>
                        <div className="flex flex-col">
                            <span className="text-white text-lg">{entry.name}</span>
                            <span className="text-gray-400 text-sm">{formatDate(entry.createdAt)}</span>
                        </div>
                      <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                        entry.searchType === "Movie" 
                        ? "bg-red-600"
                        : entry.searchType === "Tv"
                        ? "bg-blue-600"
                        : "bg-green-600"
                      }`}>{entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}</span>
                      <button onClick={()=>handleDelete(entry.id)}  className="flex justify-center items-center mx-2 mt-1">
    <Trash size={20} className="hover:fill-red-800 border-none"/>
</button>

                    </div>
                    
               ) })}
            </div>

        </div>

    </div>
  )
}

export default HistoryPage
