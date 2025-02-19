function RajoutInfos(){

    return(
        <div className="cadre">
            <h1>Informations complémentaires</h1>
            Email  <br/> <input 
            type="email" 
            name="email"
            placeholder="Entrez votre mail"/>  
            
<br/>       Téléphone  <br/><input 
            type="tel"
            name="tel"
            placeholder="Entrez votre numéro de téléphone"/>
<br/> 
<br/>      Nom du parti politique <br/><textarea 
            placeholder=""/> 

<br/>      
<br/>       Slogan  <br/><textarea
            placeholder="Cherchez à attirer l'attention de l'électeur"/>

<br/>      
<br/>       Photo  <br/><input 
            type="file" 
            name="image"
            accept="image"/>
<br/>      
<br/> 
            
            Choisissez les trois couleurs de votre parti <br/>
            <input type="color" name="color"/> <br/>
            <input type="color" name="color"/> <br/>
            <input type="color" name="color"/> <br/>

            <br/>  <button className="linkButton">Valider</button>
            </div>
 

    )
}
export default RajoutInfos