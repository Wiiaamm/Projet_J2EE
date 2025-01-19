package com.example.MS_Employes.service;

import com.example.MS_Employes.model.Document;
import com.example.MS_Employes.model.Employee;
import com.example.MS_Employes.repository.DocumentRepository;
import com.example.MS_Employes.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final EmployeeRepository employeeRepository;

    public DocumentService(DocumentRepository documentRepository, EmployeeRepository employeeRepository) {
        this.documentRepository = documentRepository;
        this.employeeRepository = employeeRepository;
    }

    public Document uploadDocument(Long employeeId, MultipartFile file) throws IOException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setData(file.getBytes());
        document.setEmployee(employee);

        return documentRepository.save(document);
    }
}
