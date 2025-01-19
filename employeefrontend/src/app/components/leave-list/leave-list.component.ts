import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';
import { LeaveStatus } from '../../models/leave-status.enum';
import {StatusClasses, StatusLabels} from '../../models/status-types.interface';
import {LeaveTypes} from '../../models/leave-types.interface';


@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leave-list.component.html'
})
export class LeaveListComponent implements OnInit {
  leaves: Leave[] = [];

  private readonly statusClasses: StatusClasses = {
    [LeaveStatus.PENDING]: 'badge bg-warning',
    [LeaveStatus.APPROVED]: 'badge bg-success',
    [LeaveStatus.REJECTED]: 'badge bg-danger'
  };

  private readonly statusLabels: StatusLabels = {
    [LeaveStatus.PENDING]: 'En attente',
    [LeaveStatus.APPROVED]: 'Approuvée',
    [LeaveStatus.REJECTED]: 'Rejetée'
  };

  private readonly leaveTypes: LeaveTypes = {
    'PAID': 'Congé payé',
    'UNPAID': 'Congé sans solde',
    'SICK': 'Congé maladie',
    'OTHER': 'Autre'
  };

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    const employeeId = 1; // À remplacer par l'ID de l'utilisateur connecté
    this.leaveService.getEmployeeLeaves(employeeId)
      .subscribe(data => this.leaves = data);
  }

  getStatusBadgeClass(status: LeaveStatus): string {
    return this.statusClasses[status];
  }

  getStatusLabel(status: LeaveStatus): string {
    return this.statusLabels[status];
  }

  getLeaveTypeLabel(type: keyof LeaveTypes): string {
    return this.leaveTypes[type] || 'Type inconnu';
  }

  cancelLeave(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
      this.leaveService.cancelLeave(id)
        .subscribe(() => this.loadLeaves());
    }
  }

  protected readonly LeaveStatus = LeaveStatus;
}
