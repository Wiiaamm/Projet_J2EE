package com.example.MS_Employes.repository;

import com.example.MS_Employes.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
