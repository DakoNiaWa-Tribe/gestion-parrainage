/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import CardForm from "../component/cardform"
import anime from "animejs";
import BackgroundCarousel from "../component/carousel";
import { useAuth } from "../context/authContext";



function Login() {
  const blueDivRef = useRef(null); 
   const [isconnectedA, setconnectedA ] = useState(false);
   const { isconnected, setIsconnected } = useAuth();// Référence à la div bleue


   useEffect(() => {
    setIsconnected(isconnectedA);
   console.log(`is connected global :`, isconnected);
    
  }, [isconnectedA]);

  useEffect(() => {
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    anime({
      targets: blueDivRef.current, // Cible la div référencée
      width: isSmallScreen ? '0%' : '50%',// Réduit la taille à 50%
      duration: 2000,
      delay: 500, // Durée de l'animation (2 secondes)
      easing: 'easeInOutQuad', // Animation fluide
      complete: () => {
        isSmallScreen ? (blueDivRef.current.classList.add("max-md:hidden") , blueDivRef.current.style.width = '50%') : blueDivRef.current.classList.add("max-md:hidden") ;
      }
      
    });
  }, []);
  return (
    <>
      {/* <Layout>
        <CardForm/>
      </Layout> */}
      <div className=" w-screen   h-screen overflow-hidden">
        <div className="relative z-0 bg-sky-100 min-h-full w-full flex   shadow-2xl shadow-black md:w-1/2    ">
        
          <CardForm isconnected={isconnectedA} setIsconnected={setconnectedA}/>
        </div>
        <div 
          ref={blueDivRef}
          className=" absolute top-0 right-0 z-10  h-full w-full "
          > 
            <BackgroundCarousel/>

          </div>
      </div>
    </>
  )
}

export default Login
