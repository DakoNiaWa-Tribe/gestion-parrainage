import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { NgIf } from '@angular/common';


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

    constructor(private fb: FormBuilder, private router: Router) {
        this.importForm = this.fb.group({
          file: [null, Validators.required],
          checksum: ['', Validators.required]
        });
      }


    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
          this.fileName = file.name;
    
          // Lire le contenu du fichier pour le hachage
          const reader = new FileReader();
          reader.onload = (e) => {
            this.fileContent = reader.result;
            this.calculateHash(reader.result as string);
          };
          reader.readAsText(file);
        }
      }
    
      calculateHash(fileContent: string) {
        this.fileHash = sha256(fileContent);
        this.importForm.controls['checksum'].setValue(this.fileHash);
      }
    
      onSubmit() {
        if (this.importForm.valid) {
          console.log('Fichier prêt à être envoyé :', this.fileName);
          console.log('Empreinte SHA-256 :', this.fileHash);
          alert('Fichier importé avec succès !');
        }
    }

    back(): void {
        this.router.navigateByUrl('');
    }
}