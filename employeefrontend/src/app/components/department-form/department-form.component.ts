import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;
  departmentId?: number;
  parentDepartments: Department[] = [];
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      parentDepartment: [null],
      manager: [null]
    });
  }

  ngOnInit(): void {
    this.loadParentDepartments();
    this.loadEmployees();

    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.departmentId) {
      this.isEditMode = true;
      this.loadDepartment();
    }
  }

  loadParentDepartments(): void {
    this.departmentService.getAllDepartments()
      .subscribe(departments => {
        this.parentDepartments = departments.filter(d => d.id !== this.departmentId);
      });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  loadDepartment(): void {
    this.departmentService.getDepartmentById(this.departmentId!)
      .subscribe(department => {
        this.departmentForm.patchValue(department);
      });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const department: Department = this.departmentForm.value;

      if (this.isEditMode) {
        this.departmentService.updateDepartment(this.departmentId!, department)
          .subscribe(() => {
            this.router.navigate(['/departments']);
          });
      } else {
        this.departmentService.createDepartment(department)
          .subscribe(() => {
            this.router.navigate(['/departments']);
          });
      }
    }
  }
}
