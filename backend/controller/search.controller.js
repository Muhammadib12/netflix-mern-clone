import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req,res){
    const {query} = req.params;
    try{

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        
       
        if(data.results.length === 0){
            return res.status(404).json({success:false,message:"Actor by this name not found"})
        }
        
        
       

       
            await User.findByIdAndUpdate(req.user._id,{
                $push:{
                    searchHistory:{
                        id:data.results[0].id,
                        image:data.results[0].poster_path,
                        name:data.results[0].name,
                        searchType:"Person",
                        createdAt:new Date(),
                    }
                }
            })
        
      
        res.status(200).json({success:true,content:data});

    }catch(e){
        console.log(e.message);        
        res.status(500).json({success:false,message:"Internal server error"});

    }
}

export async function searchMovie(req,res){
    const {query} = req.params;
    try{

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0){
            return res.status(404).json({success:false,message:"Movie by this name not fond!"});
        }
     
      

  
            await User.findByIdAndUpdate(req.user._id,{
                $push:{
                    searchHistory:{
                        id:data.results[0].id,
                        image:data.results[0].poster_path,
                        name:data.results[0].name,
                        searchType:"Movie",
                        createdAt:new Date(),
                    }
                }
            })
        
      
        
        
        
        res.status(200).json({success:true,content:data});
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function searchTv(req,res){
    const {query} = req.params;
    try{

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0){
            return res.status(404).json({success:false,message:"Tv by this name not found"});
        }



       
            await User.findByIdAndUpdate(req.user._id,{
                $push:{
                    searchHistory:{
                        id:data.results[0].id,
                        image:data.results[0].poster_path,
                        name:data.results[0].name,
                        searchType:"Tv",
                        createdAt:new Date(),
                    }
                }
            })
        
      

        res.status(200).json({success:true,content:data});

    }catch(e){
       
        
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


export async function getHistory(req,res) {
    
    try{
        res.status(200).json({success:true,content:req.user.searchHistory})
    }catch(e){  
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function removeItemFromSearchHistory(req,res){
    let {id} = req.params;
    id = parseInt(id);
    try{
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id}
            }
        })
        res.status(200).json({success:true,message:"Deleted Successfully"})
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"});
    }
} 