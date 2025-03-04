import { FicheCandidats } from "../datas/FicheCandidats";
import { Link } from "react-router-dom";

function InfosSupp(){
    console.log(FicheCandidats)
    return(
        <div>
        <div className="cadre">
            <h1>Informations du candidat</h1>
            <ul className="cadre">
                {FicheCandidats.map((candidat) => (
                    <li key={`${candidat.numeroCandidat}`}>
                        <strong>   {candidat.nom} {candidat.prenom}   </strong> <br/>
              Numéro candidat :    {candidat.numeroCandidat} <br/>
            Date de Naissance :    {candidat.dateNaissance}    
                    </li>
                ))}
            </ul>
        
                <div className="linkButton">
                <Link to='/RajoutInfos.js'>Saisie des informations complémentaires</Link>  
                </div>
                </div>
   </div>
       
        
    )
}
export default InfosSupp