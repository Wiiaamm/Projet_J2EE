// src/app/components/document-upload/document-upload.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent {
  @Input() employeeId!: number;
  selectedFile: File | null = null;
  uploadProgress = 0;
  message = '';
  isUploading = false;

  constructor(private documentService: DocumentService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.message = 'Veuillez sélectionner un fichier';
      return;
    }

    this.isUploading = true;
    this.message = '';
    this.uploadProgress = 0;

    this.documentService.uploadDocument(this.employeeId, this.selectedFile)
      .subscribe({
        next: (response) => {
          this.message = 'Document téléchargé avec succès';
          this.selectedFile = null;
          this.uploadProgress = 100;
        },
        error: (error) => {
          this.message = `Erreur lors du téléchargement: ${error.message}`;
        },
        complete: () => {
          this.isUploading = false;
        }
      });
  }
}
