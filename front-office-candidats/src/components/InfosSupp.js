import { FicheCandidats } from "../datas/FicheCandidats";

function InfosSupp(){
    console.log(FicheCandidats)
    return(
        <div className="cadre">
            <h1>Informations du candidat</h1>
            <ul>
                {FicheCandidats.map((candidat) => (
                    <li key={`${candidat.numeroCandidat}`}>
                        <strong>   {candidat.nom} {candidat.prenom}   </strong> <br/>
              Numéro candidat :    {candidat.numeroCandidat} <br/>
            Date de Naissance :    {candidat.dateNaissance}
                        
                        </li>
                ))}
            </ul>
        </div>
    )
}
export default InfosSupp