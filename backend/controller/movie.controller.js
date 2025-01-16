import {fetchFromTMDB} from '../services/tmdb.service.js';



//get trending movies
export async function getTrendinMovies(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomMovie });
    } catch (e) {
        console.error("Error fetching trending movies:", e.message);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message });
    }
}



//get movie trailer
export async function getMovieTrailer(req,res)  {
    const {id} = req.params;
    try{
       const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
      
       res.status(200).json({success:true,trailers:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }

}


//get movie details
export async function getMovieDetails(req,res){
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


//get similar movies
export async function getSimilarMovies(req,res){
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


//get movies by category
export async function getMoviesByCategory(req,res){
    const {category} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
    }
}