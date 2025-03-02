/* eslint-disable react/prop-types */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import CandidatCard from "./candidat";


const Swippercarrousel= ({cardRef,candidats,setSelectedcandidat,setParainer,Parainer,isconnected})=>{
  console.log("dans le carousell",isconnected)
      return (
        <>
          <Swiper
          ref={cardRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          mousewheel={{ forceToAxis: true }}
          coverflowEffect={
                {
                  rotate: 0,
                  stretch: 60,
                  depth: 100,
                  modifier: 5,
                  slideShadows: true,
                }
              
          }
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Mousewheel]}
        className="w-full max-w-5xl overflow-visible!  "
      >
        {candidats.map((candidat, index) => (
          <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
            {/* <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
              </div>
            </div> */}
           <CandidatCard userDetails={candidat} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer}  Parainer={Parainer} isconnected={isconnected}/>


          </SwiperSlide>
        ))}
      </Swiper>
        </>
      )

};
const SwipperCards= ({cardRef,candidats,setSelectedcandidat,setParainer,Parainer,isconnected})=>{

  return(

    <>
    <Swiper
    ref={cardRef}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        mousewheel={{ forceToAxis: true }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, EffectCards]}
      className="w-full max-w-5xl overflow-visible!  "
    >
      {candidats.map((candidat, index) => (
        <SwiperSlide key={index} className=" relative h-full w-[60%]!  ">
          {/* <div className="relative w-full h-[70vh] rounded-xl shadow-lg overflow-hidden"
          >
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-lg font-bold">Image {index + 1}</h2>
            </div>
          </div> */}
          <CandidatCard userDetails={candidat} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer}  Parainer={Parainer} isconnected={isconnected}/>
        </SwiperSlide>
      ))}
    </Swiper>
</>
  )
 

};
const Loader = () =>{
  return <>
   <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
  </>
}

const Swiper3DCarousel = ({mode,setParainer,setSelectedcandidat,Parainer,isconnected}) => {
   const baseRef = useRef(null);
  const [candidats, setCandidats] = useState([]);
  const [Candidatss, setCandidatss] = useState([]);
  const [Load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const cardRef =useRef(null);
  const fetchCandidates = async () => {
    setError("");
    try {
      const response = await fetch("https://api.example.com/candidates"); // Remplace avec ton URL API
      if (!response.ok) throw new Error("Erreur lors de la récupération des candidats");
      const data = await response.json();
      setCandidatss(data); // Assure-toi que la réponse est bien un tableau
    } catch (err) {
      setError(err.message);
    } finally {
      setLoad(false);
    }
  };

  
  useEffect(() => {
    fetchCandidates();
  }, [Candidatss]);
  useEffect(() => {
    anime({
            targets: cardRef.current, // Cible la div référencée
            opacity: [0,1],
            scale: [0.95,1],
          duration: 600, // Durée de l'animation 
            easing: 'easeInOutQuad', // Animation fluide
          });
    
  }, [mode]); 
  
  useEffect(() => {
    anime({
      targets: baseRef.current, // Cible la div référencée
      opacity: [0,1],
      delay : 900,
    duration: 600, // Durée de l'animation 
      easing: 'easeInOutQuad', // Animation fluide
    });
  }, [Load]);
  useEffect(() => {
    // Simuler une requête API avec des données de test
    const mockData = [
      {
        firstName: "Jean",
        lastName: "Dupont",
        profilImg: "/img/tet1.png",
        birthDate: "12/06/1980",
        votingOffice: "Bureau 45",
        party: 1,
        slogan: "Un avenir meilleur pour tous !",
      },
      {
        firstName: "Marie",
        lastName: "Curie",
        profilImg: "/img/tet.jpg",
        birthDate: "07/11/1867",
        votingOffice: "Bureau 12",
        party: 2,
        slogan: "Science et progrès !",
      },
      {
        firstName: "Nelson",
        lastName: "Mandela",
        profilImg: "/img/tete-chat-profil_372268-573.jpg",
        birthDate: "18/07/1918",
        votingOffice: "Bureau 27",
        party: 3,
        slogan: "Liberté et justice !",
      },
    ];
    
    setTimeout(() => setCandidats(mockData), 1000); // Simulation du délai de chargement
  }, []);
  return (
    Load ? (
      <Loader />
    ) : ( error != null ?  
      <div 
        ref={baseRef}
        className="flex items-center justify-center w-full h-full !overflow-visible bg-gray-900">
        {mode === "carrousel" ? (
          <Swippercarrousel cardRef={cardRef} candidats={candidats} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer} Parainer={Parainer} isconnected={isconnected} />
        ) : (
          <SwipperCards cardRef={cardRef} candidats={candidats} setSelectedcandidat={setSelectedcandidat} setParainer={setParainer} Parainer={Parainer} isconnected={isconnected}  />
        )}
      </div>
      : 
      <div
      id="alert-box"
      className={`p-3 rounded-lg mb-4 ${
       'bg-red-100 text-red-600'
      }`}
    >
      {error}
    </div>
    )
  );
};

export default Swiper3DCarousel;
