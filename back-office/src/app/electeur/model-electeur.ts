export class ModelElecteur{
    constructor(
        public numElecteur : number,
        public cin : string,
        public nom : string,
        public prenom : string,
        public date_naissance : Date,
        public lieu_naissance : string,
        public sexe : string,
        public bureau_vote : string,
    ){}
}