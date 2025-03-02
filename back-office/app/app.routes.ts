import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component'
import {AddCandidatComponent} from './add-candidat/add-candidat.component'
import {ViewCandidatComponent} from './view-candidat/view-candidat.component'
import {PeriodeParrainageComponent} from './periode-parrainage/periode-parrainage.component'
import {UploadElecteurComponent} from './electeur/upload-electeur/upload-electeur.component'

export const routes: Routes = [
    {path: `AddCandidat`, component: AddCandidatComponent},
    {path: 'ViewCandidat', component: ViewCandidatComponent},
    {path: 'Parrainage', component: PeriodeParrainageComponent},
    {path: 'UploadElecteur', component: UploadElecteurComponent},
    {path: '', component: LandingPageComponent }
];
