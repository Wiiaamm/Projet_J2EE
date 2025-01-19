import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:9092/api/leaves';

  constructor(private http: HttpClient) { }

  // Ajout de la méthode manquante cancelLeave
  cancelLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(this.apiUrl, leave);
  }

  approveLeave(id: number, managerId: number): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}/approve?managerId=${managerId}`, {});
  }

  rejectLeave(id: number, managerId: number): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}/reject?managerId=${managerId}`, {});
  }

  getEmployeeLeaves(employeeId: number): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getManagerPendingLeaves(managerId: number): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/manager/${managerId}/pending`);
  }

  getLeaveById(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/${id}`);
  }

  updateLeave(id: number, leave: Leave): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}`, leave);
  }

}
