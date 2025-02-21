import { useState } from "react";
import Layout from "../component/body"
import Candidat from "../component/candidat"
import Swiper3DCarousel from "../component/Slider";



function Accueil() {

  /*const router= createBrowserRouter([

    {
      path: '/form',
      element: Formsite
    }
  ])*/
    const name = "Samba";
    const profilImg = "img/tete-chat-profil_372268-573.jpg"; 
     const [userDetails] = useState({
        firstName: "Jean",
        lastName: "Dupont",
        birthDate: "12/04/1990",
        votingOffice: "Bureau 12",
      });

  return (
    <>
      <Layout>
            <div className=" w-full flex justify-center items-center min-h-full  py-10 ">
              <Swiper3DCarousel/>

            </div>
      </Layout>
    </>
  )
}

export default Accueil
