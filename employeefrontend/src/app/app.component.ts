// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    EmployeeListComponent,
    EmployeeFormComponent,
    DocumentUploadComponent,
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand">Gestion Employés</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" routerLink="/employees" routerLinkActive="active">Employés</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/departments" routerLinkActive="active">Départements</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/leaves" routerLinkActive="active">Absences</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container mt-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {}
