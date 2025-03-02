import { ModelCandidat } from "../models/model-candidat"
import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../services-candidat/candidat.service'
import { Router } from '@angular/router';



@Component({
  selector: 'view-candidat',
  imports: [],
  standalone: true,
  templateUrl: './view-candidat.component.html',
  styleUrl: './view-candidat.component.scss'
})

export class ViewCandidatComponent implements OnInit{
    constructor(private service: CandidatService, private router: Router){}
    models!: ModelCandidat[];

    ngOnInit(): void {
        this.models = this.service.getcandidats();
    }

    back(): void {
        this.router.navigateByUrl('');
      }
}