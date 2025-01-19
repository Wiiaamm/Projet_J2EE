// src/app/components/employee-form/employee-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ContractType } from '../../models/contract-type.enum';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId?: number;
  contractTypes = Object.values(ContractType);

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId!)
      .subscribe(employee => {
        this.employeeForm.patchValue({
          ...employee,
          startDate: employee.startDate?.split('T')[0],
          endDate: employee.endDate?.split('T')[0]
        });
      });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;

      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employeeId!, employee)
          .subscribe(() => {
            this.router.navigate(['/employees']); // Redirige vers la liste des employés
          });
      } else {
        this.employeeService.createEmployee(employee)
          .subscribe(() => {
            this.router.navigate(['/employees']); // Redirige vers la liste des employés
          });
      }
    }
  }


}
