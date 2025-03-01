import { useEffect, useRef, useState } from "react";
import Layout from "../component/body"
import Swiper3DCarousel from "../component/Slider";
import anime from "animejs";



function Accueil() {


      const [mode, setmode] = useState("carrousel");
      const buttonRef = useRef(null);
      const buttonRef1 = useRef(null);
      const buttonRef2= useRef(null);
    
      useEffect(() => {
        anime({
          targets: buttonRef.current?.children,
          scale: [0.8, 1],
          duration: 800,
          easing: "easeOutElastic",
          delay: anime.stagger(200),
        });
      }, []);
    
      const handleCarrouselClick = () => {
        setmode("carrousel");
        anime({
          targets: buttonRef1.current,
          translateX: [0, 50, 0],
          duration: 200,
          easing: "easeOutElastic",
          delay: anime.stagger(200),
        });
      };
      
      const handleSliderClick = () => {
        setmode("slider");
        anime({
          targets: buttonRef2.current,
          translateX: [0, 50, 0],
          duration: 200,
          easing: "easeOutElastic",
          delay: anime.stagger(200),
        });
      };
      console.log(mode);
    

  return (
    <>
      <Layout>
            <div className=" w-full flex flex-col justify-center items-center min-h-full   ">
              <div ref={buttonRef}  className="flex absolute left-8 top-20 z-10">

                      <button
                      ref={buttonRef1}
                  className={`control-button flex items-center justify-center p-2 shadow-lg transition-all hover:scale-110 text-violet-400 hover:text-violet-500 cursor-pointer ${
                    mode === "carrousel" ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={handleCarrouselClick}
                >
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <rect x="4" y="8" width="5" height="12" rx="1"
                      opacity="0.5" transform="skewX(-5)" 
                      filter="drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))"/>
                    
                    <rect x="9" y="7" width="6" height="12" rx="1"
                      filter="drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.4))"/>

                    <rect x="15" y="8" width="5" height="12" rx="1"
                      opacity="0.5" transform="skewX(5)" 
                      filter="drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))"/>
                  </svg>

                </button>

                {/* Bouton Pause */}
                <button
                  ref={buttonRef2}
                  className={`control-button flex items-center justify-center p-2 shadow-lg transition-all hover:scale-110 text-violet-400 hover:text-violet-500 cursor-pointer ${
                    mode === "slider" ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={handleSliderClick}
                >
                            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
            >
              <rect x="2" y="8" width="3" height="12" rx="1" opacity="0.5" />
              <rect x="8" y="8" width="6" height="12" rx="1" />
              <rect x="17" y="8" width="3" height="12" rx="1" opacity="0.5" />
            </svg>
                </button>

              </div>
              <Swiper3DCarousel mode={mode} />
              {/* <CandidatCard/> */}
            </div>
      </Layout>
    </>
  )
}

export default Accueil
