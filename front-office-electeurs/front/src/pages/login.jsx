import { useEffect, useRef } from "react";
import CardForm from "../component/cardform"
import anime from "animejs";
import BackgroundCarousel from "../component/carousel";



function Login() {
  const blueDivRef = useRef(null); // Référence à la div bleue

  useEffect(() => {
    anime({
      targets: blueDivRef.current, // Cible la div référencée
      width: '50%', // Réduit la taille à 50%
      duration: 2000,
      delay: 500, // Durée de l'animation (2 secondes)
      easing: 'easeInOutQuad', // Animation fluide
    });
  }, []);
  return (
    <>
      {/* <Layout>
        <CardForm/>
      </Layout> */}
      <div className=" w-screen   h-screen overflow-hidden">
        <div className="relative z-0 bg-sky-100 h-full w-1/2 flex  shadow-2xl shadow-black    ">
          <CardForm/>
        </div>
        <div 
          ref={blueDivRef}
          className=" absolute top-0 right-0 z-10  h-full w-full"
          >
            <BackgroundCarousel/>

          </div>
      </div>
    </>
  )
}

export default Login
