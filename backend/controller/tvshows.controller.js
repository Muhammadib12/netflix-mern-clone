import {fetchFromTMDB} from '../services/tmdb.service.js';



//get trending tvs
export async function getTrendinTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomTv });
    } catch (e) {
        console.error("Error fetching trending tv:", e.message);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message });
    }
}



//get tv trailer
export async function getTvTrailer(req,res)  {
    const {id} = req.params;
    try{
       const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
      
       res.status(200).json({success:true,trailers:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }

}


//get movie details
export async function getTvDetails(req,res){
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


//get similar tv
export async function getSimilarTv(req,res){
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


//get tv by category
export async function getTvByCategory(req,res){
    const {category} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}