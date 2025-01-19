import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LeaveService} from '../../services/leave.service';
import {Leave} from '../../models/leave.model';
import {LeaveStatus} from '../../models/leave-status.enum';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leave-form.component.html'
})
export class LeaveFormComponent implements OnInit {
  leaveForm: FormGroup;
  isEditMode = false;
  leaveId?: number;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      leaveType: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = !!id;
      if (this.isEditMode) {
        this.leaveId = Number(id);
        this.loadLeaveData();
      }
    });
  }

  loadLeaveData(): void {
    if (this.leaveId) {
      this.leaveService.getLeaveById(this.leaveId).subscribe(leave => {
        this.leaveForm.patchValue(leave);
      });
    }
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const leaveData: Leave = { ...this.leaveForm.value };

      if (this.isEditMode && this.leaveId) {
        // Mise à jour d'une demande existante
        this.leaveService.updateLeave(this.leaveId, leaveData).subscribe(() => {
          this.router.navigate(['/leaves']);
        });
      } else {
        // Création d'une nouvelle demande
        const employeeId = 1; // Remplacer par l'ID réel de l'utilisateur connecté
        leaveData.employeeId = employeeId;
        leaveData.status = LeaveStatus.PENDING;

        this.leaveService.createLeave(leaveData).subscribe(() => {
          this.router.navigate(['/leaves']);
        });
      }
    }
  }
}
