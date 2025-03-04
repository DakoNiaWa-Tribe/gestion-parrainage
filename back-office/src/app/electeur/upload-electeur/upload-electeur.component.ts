import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { NgIf } from '@angular/common';
import { ApiService } from '../../API/api.service';



@Component({
  selector: 'upload-electeur',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  standalone: true,
  templateUrl: './upload-electeur.component.html',
  styleUrl: './upload-electeur.component.scss'
})

export class UploadElecteurComponent{   

    importForm: FormGroup;
    fileName: string = '';
    fileContent: string | ArrayBuffer | null = null;
    fileHash: string = '';
    file!: File;

    constructor(private fb: FormBuilder, private router: Router, private api: ApiService) {
        this.importForm = this.fb.group({
          file: [null, Validators.required],
          checksum: ['', Validators.required]
        });
      }


    onFileSelected(event: any) {
        this.file = event.target.files[0];
        if (this.file) {
          this.fileName = this.file.name;
    
          // Lire le contenu du fichier pour le hachage
          const reader = new FileReader();
          reader.onload = (e) => {
            this.fileContent = reader.result;
            this.calculateHash(reader.result as string);
          };
          reader.readAsText(this.file);
        }
      }
    
    calculateHash(fileContent: string) {
      this.fileHash = sha256(fileContent);
      this.importForm.controls['checksum'].setValue(this.fileHash);
    }
    

    onSubmit() {
      this.api.postUploadeElecteurs(this.file, this.fileHash, 0).subscribe(response => {
        console.log('Fichier prêt à être envoyé :', this.fileName);
        console.log('Empreinte SHA-256 :', this.fileHash);
        alert('Fichier importé avec succès !');
      }, error => {
        alert('Erreur au niveau de l\'importation');
        console.log('Erreur au niveau de l\'importation: ', error);
      })
        
    }

    back(): void {
        this.router.navigateByUrl('LandingPage');
    }
}