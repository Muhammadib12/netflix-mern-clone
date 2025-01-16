import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from 'react-player';
import { ORIGINAL_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { formatReleaseData } from "../utils/functions";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

function WatchPage() {

  

    const {id} = useParams();

    const [trailers,setTrailers] = useState([]);
    const [currenTrailerIdx,setCurrentTrailerIdx] = useState(0);
    const [loading,setLoading] = useState(true);
    const [content,setContent] = useState({});
    const [similarContent,setSimilarContent] = useState([]);
    const {contentType} = useContentStore();


    const slideRef = useRef(null);

    // trailers
    useEffect(() => {
        const getTrailers = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers);
            }catch(e){
                if(e.message.includes("404")){
                    setTrailers([]);
                }
            }
        }

        getTrailers();

    },[contentType,id]);

    //similar
    useEffect(() => {
        const getSimilar = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.content);
            }catch(e){
                if(e.message.includes("404")){
                    setSimilarContent([]);
                }
            }
        }

        getSimilar();

    },[contentType,id]);

    // data
    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content);
            }catch(e){
                if(e.message.includes("404")){
                    setContent([]);
                }
            }finally{
                setLoading(false);
            }
        }

        getData();

    },[contentType,id]);

    const handleNext = () => {
        if(currenTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currenTrailerIdx + 1);
    }
    
    const handlePrev = () => {
        if(currenTrailerIdx > 0) setCurrentTrailerIdx(currenTrailerIdx - 1);
    }


    const scrollLeft = () => {
        if(slideRef.current) slideRef.current.scrollBy({left: -slideRef.current.offsetWidth,behavior:"smooth"});
    }

    const scrollRight = () => {
        if(slideRef.current) slideRef.current.scrollBy({left: slideRef.current.offsetWidth,behavior:"smooth"});
    }



    if(loading) return(      
        <div className="min-h-screen bg-black p-10 ">
            <WatchPageSkeleton/>
        </div>
     
    )


    if(!content) return (
        <div className="text-white bg-black h-screen">
            <div className="max-w-6xl mx-auto">
                <NavBar/>
            <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                <h2 className="text-2xl sm:text-5xl font-bold text-balance">Content not found</h2>
            </div>
            

           </div>
        </div>
    )


  return (
    <div className="bg-black min-h-screen text-white">
        <NavBar/>
        <div className="mx-auto container px-4 py-8 h-full">
            {trailers.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currenTrailerIdx === 0 ?
                        'cursor-not-allowed opacity-40' : ''
                    }`}  disabled={currenTrailerIdx === 0}>
                        <ChevronLeft size={24} onClick={handlePrev}/>
                    </button>

                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currenTrailerIdx === trailers.length-1 ?
                        'cursor-not-allowed opacity-50' : ''
                    }`}  disabled={currenTrailerIdx === trailers.length-1}>
                        <ChevronRight size={24} onClick={handleNext}/>
                    </button>
                </div>
            )}

            <div className="aspect-video mb-8 sm:px-10 md:px-32">
                {trailers.length > 0 && (
                    <ReactPlayer 
                    controls={true}
                    width={'100%'}
                    height={'70vh'}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={`https://www.youtube.com/watch?v=${trailers[currenTrailerIdx].key}`}
                    />
                )}

                {trailers.length === 0 && (
                    <h2 className="text-xl text-center mt-5">
                        No trailers avilable for{" "}
                        <span className="font-bold text-red-600">{content?.title || content?.name}</span>
                    </h2>
                )}
            </div>
            {/* movie details */}
            <div className="flex flex-col md:flex-row items:center justify-between gap-20 max-w-6xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>

                    <p className="mt-2 text-lg">
                        {formatReleaseData(content?.release_date || content?.first_air_date)} |{" "}
                        {content?.adult ? (
                            <span className="text-red-600">PG-18</span>
                        ) : (
                            <span className="text-green-500">PG-13</span>
                        )}
                    </p>
                    <p>{content?.overview}</p>
                </div>
                <img src={ORIGINAL_IMAGE_BASE_URL + content.poster_path} alt="POSTER_IMAGE" className="max-h-[600px] rounded-md"/>
            </div>

            {similarContent.length > 0 && (
                <div className="mt-12 max-w-5xl mx-auto relative">
                    <h3 className="text-3xl font-bold mb-4">
                        Similiar Movies/Tv Show 
                    </h3>

                    <div className="flex overflow-x-scroll no-scrollbar gap-4 pb-4 group" ref={slideRef}>

                    {similarContent.map((item) => {
                        if(item.poster_path === null) return null;
                        return (
                            <Link key={item.id} to={`/watch/${item.id}`} className="w-52 flex-none">
                                <img src={SMALL_IMAGE_BASE_URL + item.poster_path} alt="Poster Imag" className="w-full h-auto rounded-md" />
    
                                <h4 className="mt-2 text-lg font-semibold">
                                    {item.title || item.name}
                                </h4>
    
                            </Link>
    
                        )
                    })}

                    <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transtion-all duration-300
                    cursor-pointer bg-red-600 text-white rounded-full" onClick={scrollRight}/>

                    <ChevronLeft className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transtion-all duration-300
                    cursor-pointer bg-red-600 text-white rounded-full" onClick={scrollLeft}/>

                    </div>


                                       
                </div>
            )}
        </div>
    </div>
  )
}

export default WatchPage