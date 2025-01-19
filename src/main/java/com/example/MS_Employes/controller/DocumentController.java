package com.example.MS_Employes.controller;

import com.example.MS_Employes.model.Document;
import com.example.MS_Employes.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload/{employeeId}")
    public ResponseEntity<?> uploadDocument(
            @PathVariable Long employeeId,
            @RequestPart("file") MultipartFile file) {
        try {
            // Vérification de la validité du fichier
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est manquant ou vide.");
            }

            // Appel du service pour traiter le fichier
            Document uploadedDocument = documentService.uploadDocument(employeeId, file);

            // Réponse réussie avec les détails du document
            return ResponseEntity.ok(uploadedDocument);
        } catch (RuntimeException e) {
            // Gestion des exceptions liées à l'absence de l'employé
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employé introuvable : " + e.getMessage());
        } catch (IOException e) {
            // Gestion des exceptions liées à l'upload ou au traitement du fichier
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload du document : " + e.getMessage());
        }
    }
}
