import { Injectable } from "@angular/core";
import {ModelElecteur} from "./model-electeur"

@Injectable({
    providedIn: 'root'
})

export class ElecteurService{

    modelElecteurs : ModelElecteur[] = [
        new ModelElecteur(
            473641168,
            '58554589496002368',
            'Faye',
            'Modou',
            new Date(2004, 10, 19),
            'Matam',
            'M',
            '29'
        ),
    new ModelElecteur(
            617178412,
            '62074978657829286',
            'Faye',
            'Mamadou',
            new Date(1981, 11, 17),
            'Dakar',
            'M',
            '2'
        ),
    new ModelElecteur(
            695088825,
            '71697927795495653',
            'Sy',
            'Mariama',
            new Date(1993, 2, 8),
            'Kaolack',
            'F',
            '19'
        ),
    new ModelElecteur(
            699962484,
            '64906253205989310',
            'Sy',
            'Ndeye',
            new Date(1996, 3, 23),
            'Tambacounda',
            'F',
            '14'
        ),
    new ModelElecteur(
            205810775,
            '67710374041781996',
            'Diop',
            'Awa',
            new Date(1974, 11, 10),
            'Dakar',
            'F',
            '40'
        ),
    new ModelElecteur(
            203248855,
            '75261481935150645',
            'Dieng',
            'Awa',
            new Date(1975, 0, 14),
            'Dakar',
            'F',
            '29'
        ),
    new ModelElecteur(
            237529244,
            '14781947380134900',
            'Diop',
            'Lamine',
            new Date(1952, 8, 8),
            'Touba',
            'M',
            '12'
        ),
    new ModelElecteur(
            465118957,
            '45086204797825171',
            'Sy',
            'Cheikh',
            new Date(2004, 4, 22),
            'Ziguinchor',
            'M',
            '39'
        ),
    new ModelElecteur(
            924260164,
            '97129115215295324',
            'Faye',
            'Ibrahima',
            new Date(1965, 11, 27),
            'Dakar',
            'M',
            '38'
        ),
    new ModelElecteur(
            840510870,
            '11041747920686013',
            'Fall',
            'Aissatou',
            new Date(1993, 11, 20),
            'Ziguinchor',
            'F',
            '36'
        ),
    new ModelElecteur(
            931898130,
            '16788961907717934',
            'Gueye',
            'Alioune',
            new Date(1996, 7, 10),
            'Thiès',
            'M',
            '24'
        ),
    new ModelElecteur(
            701644192,
            '65474690980123459',
            'Faye',
            'Awa',
            new Date(1962, 5, 1),
            'Matam',
            'F',
            '44'
        ),
    new ModelElecteur(
            993453235,
            '77425646821455182',
            'Ba',
            'Alioune',
            new Date(1967, 11, 11),
            'Kaolack',
            'M',
            '20'
        ),
    new ModelElecteur(
            194573033,
            '21616864270252821',
            'Fall',
            'Modou',
            new Date(1958, 7, 22),
            'Saint-Louis',
            'M',
            '28'
        ),
    new ModelElecteur(
            230464092,
            '77507577596959640',
            'Ba',
            'Seynabou',
            new Date(1961, 2, 19),
            'Ziguinchor',
            'F',
            '39'
        ),
    new ModelElecteur(
            287760139,
            '22486553810957044',
            'Sy',
            'Aissatou',
            new Date(2005, 8, 17),
            'Thiès',
            'F',
            '25'
        ),
    new ModelElecteur(
            544751971,
            '53342151371162611',
            'Ba',
            'Dieynaba',
            new Date(1986, 8, 5),
            'Thiès',
            'F',
            '4'
        ),
    new ModelElecteur(
            192129836,
            '43647778079738237',
            'Ba',
            'Alioune',
            new Date(1996, 10, 9),
            'Tambacounda',
            'M',
            '21'
        ),
    new ModelElecteur(
            533611160,
            '90772134403271217',
            'Ndiaye',
            'Rokhaya',
            new Date(1957, 4, 10),
            'Kaolack',
            'F',
            '23'
        ),
    new ModelElecteur(
            763427552,
            '56611068203902154',
            'Dieng',
            'Ousmane',
            new Date(1956, 5, 26),
            'Ziguinchor',
            'M',
            '38'
        ),
    new ModelElecteur(
            247554939,
            '58558455791390834',
            'Fall',
            'Ndeye',
            new Date(1999, 8, 20),
            'Saint-Louis',
            'F',
            '41'
        ),
    new ModelElecteur(
            872689560,
            '78498556980935216',
            'Diop',
            'Mariama',
            new Date(1976, 9, 13),
            'Saint-Louis',
            'F',
            '39'
        ),
    new ModelElecteur(
            143895252,
            '36685344602934727',
            'Ndiaye',
            'Amadou',
            new Date(1992, 3, 9),
            'Dakar',
            'M',
            '37'
        ),
    new ModelElecteur(
            938434651,
            '81249076008876583',
            'Sy',
            'Seynabou',
            new Date(1965, 5, 24),
            'Touba',
            'F',
            '14'
        ),
    new ModelElecteur(
            584000487,
            '26575171085915669',
            'Faye',
            'Lamine',
            new Date(1968, 2, 22),
            'Touba',
            'M',
            '30'
        ),
    new ModelElecteur(
            811457610,
            '24292632547787709',
            'Gueye',
            'Ibrahima',
            new Date(1985, 0, 4),
            'Touba',
            'M',
            '2'
        ),
    new ModelElecteur(
            920121786,
            '24397289074021316',
            'Sow',
            'Ndeye',
            new Date(1983, 8, 28),
            'Thiès',
            'F',
            '21'
        ),
    new ModelElecteur(
            992659141,
            '93314138774609175',
            'Ba',
            'Awa',
            new Date(2004, 6, 4),
            'Kaolack',
            'F',
            '16'
        ),
    new ModelElecteur(
            527109635,
            '89121075367386859',
            'Dieng',
            'Mariama',
            new Date(1956, 10, 3),
            'Dakar',
            'F',
            '42'
        ),
    new ModelElecteur(
            496435282,
            '44344643193760200',
            'Seck',
            'Khady',
            new Date(1974, 4, 11),
            'Ziguinchor',
            'F',
            '6'
        ),
    new ModelElecteur(
            223551755,
            '52472925824788929',
            'Sy',
            'Ibrahima',
            new Date(1997, 5, 15),
            'Thiès',
            'M',
            '2'
        ),
    new ModelElecteur(
            858195929,
            '95070708345653812',
            'Ndiaye',
            'Rokhaya',
            new Date(1965, 7, 27),
            'Thiès',
            'F',
            '32'
        ),
    new ModelElecteur(
            166386910,
            '72335310387128346',
            'Dieng',
            'Seynabou',
            new Date(1967, 3, 11),
            'Thiès',
            'F',
            '19'
        ),
    new ModelElecteur(
            840362963,
            '33668679627121685',
            'Diop',
            'Ndeye',
            new Date(1970, 5, 5),
            'Matam',
            'F',
            '22'
        ),
    new ModelElecteur(
            658212842,
            '73418306719984325',
            'Ndiaye',
            'Dieynaba',
            new Date(1957, 10, 26),
            'Touba',
            'F',
            '47'
        ),
    new ModelElecteur(
            581144278,
            '62272741370799601',
            'Sy',
            'Modou',
            new Date(1980, 10, 16),
            'Saint-Louis',
            'M',
            '20'
        ),
    new ModelElecteur(
            276316423,
            '26349118157457806',
            'Fall',
            'Cheikh',
            new Date(1954, 1, 23),
            'Matam',
            'M',
            '20'
        ),
    new ModelElecteur(
            993717424,
            '92853554642425030',
            'Sy',
            'Aminata',
            new Date(1983, 1, 4),
            'Matam',
            'F',
            '43'
        ),
    new ModelElecteur(
            698838109,
            '58298552268662875',
            'Dieng',
            'Babacar',
            new Date(1950, 9, 15),
            'Ziguinchor',
            'M',
            '11'
        ),
    new ModelElecteur(
            458777986,
            '67856449614790384',
            'Gueye',
            'Aissatou',
            new Date(1984, 10, 7),
            'Dakar',
            'F',
            '31'
        ),
    new ModelElecteur(
            447719791,
            '43362043454947404',
            'Sow',
            'Fatou',
            new Date(1962, 2, 19),
            'Tambacounda',
            'F',
            '4'
        ),
    new ModelElecteur(
            719553324,
            '11718477812664773',
            'Gueye',
            'Serigne',
            new Date(1984, 1, 23),
            'Ziguinchor',
            'M',
            '13'
        ),
    new ModelElecteur(
            243117487,
            '27350781181388887',
            'Seck',
            'Alioune',
            new Date(1950, 11, 17),
            'Tambacounda',
            'M',
            '15'
        ),
    new ModelElecteur(
            694086022,
            '59306429253652606',
            'Fall',
            'Serigne',
            new Date(1988, 6, 11),
            'Touba',
            'M',
            '23'
        ),
    new ModelElecteur(
            284338057,
            '47703765260837049',
            'Fall',
            'Serigne',
            new Date(2005, 6, 22),
            'Kaolack',
            'M',
            '24'
        ),
    new ModelElecteur(
            641561208,
            '43589659220776011',
            'Dieng',
            'Aminata',
            new Date(1957, 3, 11),
            'Dakar',
            'F',
            '32'
        ),
    new ModelElecteur(
            381776880,
            '80513892770980669',
            'Diop',
            'Fatou',
            new Date(1966, 8, 20),
            'Dakar',
            'F',
            '22'
        ),
    new ModelElecteur(
            339919641,
            '37339400486944321',
            'Dieng',
            'Aissatou',
            new Date(1960, 4, 16),
            'Ziguinchor',
            'F',
            '4'
        ),
    new ModelElecteur(
            557409567,
            '43746057924498599',
            'Sy',
            'Cheikh',
            new Date(1998, 6, 17),
            'Thiès',
            'M',
            '30'
        ),
    new ModelElecteur(
            447176139,
            '22020426761102534',
            'Sy',
            'Serigne',
            new Date(1970, 7, 10),
            'Saint-Louis',
            'M',
            '33'
        ),
    
    ]

    getElecteurs(): ModelElecteur[]{
        return this.modelElecteurs;
    }

}