import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { missMatch } from '../customvalidator/customvalidator.validator';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData: FormGroup;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ]),
      password: new FormControl(null, Validators.required),
      confirm_password: new FormControl(null, [Validators.required,])
    },{ validators: missMatch('password','confirm_password')});
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const firstName = this.formData.get('first_name').value;
      const lastName = this.formData.get('last_name').value;
      const userName = firstName + ' ' + lastName;
      this.auth.registerUser({
        name: userName,
        email: this.formData.get('email').value,
        password: this.formData.get('password').value
      }).subscribe((res: any)=> {
        if (res.msg) {
          console.log(res.msg);
        }
      });
    }
  }
}
