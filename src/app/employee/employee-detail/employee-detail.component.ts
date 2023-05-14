import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  genders: string[] = ['Male', 'Female'];
  positions: string[] = ['Frontend Developer', 'Backend Developer', 'Mobile Developer', 'HR'];
  empForm: FormGroup;
  employees: Employee[] = [];
  empId: number;
  breadcrumb: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getEmployeeFromStorage();
    this.empId = this.route.snapshot.params['id'];
    this.empId && this.patchForm();
    this.breadcrumb = this.empId ? 'Edit' : 'New';
  }

  initForm() {
    this.empForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      dob: [''],
      email: [''],
      position: ['']
    })
  }

  patchForm() {
    this.employeeService.getEmployeeById(this.empId).subscribe(employee => this.empForm.patchValue(employee))
  }

  getEmployeeFromStorage() {
    const allEmployees = localStorage.getItem('employees');
    allEmployees && (this.employees = JSON.parse(allEmployees));
  }

  save() {
    this.empId ? this.update() : this.create();
  }

  create() {
    this.employeeService.addEmployee(this.empForm.value).subscribe(() => {
      this.router.navigate(['/employee']);
    })
  }

  update() {
    this.employeeService.updateEmployee(this.empId, this.empForm.value).subscribe(() => {
      this.router.navigate(['/employee']);
    });
  }
}


