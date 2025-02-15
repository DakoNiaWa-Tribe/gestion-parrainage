import { Routes } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component'
import {AddCandidatComponent} from './add-candidat/add-candidat.component'
import {ViewCandidatComponent} from './view-candidat/view-candidat.component'
import {ParrainageComponent} from './parrainage/parrainage.component'

export const routes: Routes = [
    {path: `AddCandidat`, component: AddCandidatComponent},
    {path: 'ViewCandidat', component: ViewCandidatComponent},
    {path: 'Parrainage', component: ParrainageComponent},
    {path: '', component: LandingPageComponent }
];
