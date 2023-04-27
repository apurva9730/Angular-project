import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  data: any = {
    tags: ['cricket', 'football', 'hockey'],

    country: [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Andorra',
      'Austria',
      'Belize',
      'Georgia',
      'India',
      'Japan',
      'Maldives',
      'New Zealand',
      'Pakistan',
      'Russia',
      'Togo',
      'Vanuatu',
      'Zambia',
    ],

    states: [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jammu and Kashmir',
      'Jharkhand',
      'Karnataka',
      'Kerala',
    ],
  };
  imageSrc!: any;
  formData = new FormData();
  file: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private http: HttpClient
  ) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.api.get('http://localhost:3000/users').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      profilePhoto: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: [''],
      age: [''],
      state: [''],
      country: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
      }),

      tags: [],
    });
  }

  handleSubmit() {
    // console.log(this.registerForm.value);
    this.formData.append({...this.registerForm.value}, 'profilePhoto', this.file);
    // this.formData.append('firstName', this.registerForm.value.firstName);
    // this.formData.append('lastName', this.registerForm.value.lastName);
    // this.formData.append('email', this.registerForm.value.email);
    // this.formData.append('age', this.registerForm.value.age);
    // this.formData.append('state', this.registerForm.value.state);
    // this.formData.append('addressLine1', this.registerForm.value.addressLine1);
    // this.formData.append('addressLine2', this.registerForm.value.addressLine2);
    console.log(this.formData)
    this.http.post('http://localhost:3000/posts', this.formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectState(event: any) {
    console.log(event);
  }
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
}
