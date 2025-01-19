package com.example.MS_Employes.repository;

import com.example.MS_Employes.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
