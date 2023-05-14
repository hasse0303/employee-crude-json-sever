import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-detail/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'gender', 'dob', 'email', 'position', 'action'];
  dataSource: Employee[] = [];
  searchForm = new FormControl();
  constructor(
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getEmployeeFromStorage();
  }

  getEmployeeFromStorage() {
    const allEmployees = localStorage.getItem('employees');
    allEmployees && (this.dataSource = JSON.parse(allEmployees));
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       const index = this.dataSource.findIndex(emp => emp.id === id);
       this.dataSource.splice(index, 1);
       localStorage.setItem('employees', JSON.stringify(this.dataSource));
       this.getEmployeeFromStorage();
      }
    })
  }

  search() {
    if(!this.searchForm.value.trim()) {
      this.getEmployeeFromStorage();
      return;
    }
    this.dataSource = this.dataSource.filter(emp => emp.name.toLowerCase().includes(this.searchForm.value.toLowerCase().trim()));
  }

  clear() {
    this.searchForm.patchValue('');
    this.getEmployeeFromStorage();
  }
}
