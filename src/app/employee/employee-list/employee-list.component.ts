import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-detail/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';


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
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }
  ngOnInit(): void {
    this.getEmployeeList();
  }

  private getEmployeeList() {
    this.employeeService.getEmployee().subscribe(data => {
      this.dataSource = data;
    })
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployeeList();
       });
      }
    })
  }

  search() {
    this.employeeService.getEmployee(this.searchForm.value).subscribe(employee => {
      this.dataSource = employee;
    });
  }

  clear() {
    this.searchForm.patchValue('');
    this.search();
  }
}
