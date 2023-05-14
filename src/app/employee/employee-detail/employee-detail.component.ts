import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee';

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
    private route: ActivatedRoute
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
      id: [''],
      name: [''],
      gender: [''],
      dob: [''],
      email: [''],
      position: ['']
    })
  }

  patchForm() {
    const employee = this.employees.find(emp => emp.id === Number(this.empId));
    employee && this.empForm.patchValue(employee);
  }

  getEmployeeFromStorage() {
    const allEmployees = localStorage.getItem('employees');
    allEmployees && (this.employees = JSON.parse(allEmployees));
  }

  save() {
    this.empId ? this.update() : this.create();
  }

  create() {
    this.employees.push({...this.empForm.value, id: Math.random()});
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.router.navigate(['/employee']);
  }

  update() {
    let i = this.employees.findIndex(emp => emp.id === Number(this.empId));
    this.employees[i] = this.empForm.value;
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.router.navigate(['/employee']);
  }
}


