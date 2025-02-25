import {Link} from "react-router-dom"

function FirstPage (){
    return (
                <div className="cadre">
        <>
        <h1>BIENVENUE CHERS CANDIDATS</h1>
   <div className='div1'>
        Veuillez renseigner votre numéro de carte d'élécteur : 

        <input 
        placeholder='' 
            
        />
    </div>
    <div>
          <Link to = '/InfosSupp.js' className='linkButton'>Enregistrer</Link>
    </div>     
    </>
                 </div>
    )

}
export default FirstPage