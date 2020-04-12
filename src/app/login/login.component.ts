import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.auth.loginUser({
        email: this.formData.get('email').value,
        password: this.formData.get('password').value
      }).subscribe((res: any)=> {
        if (res.msg) {
          console.log(res.msg);
        } else {
          console.log(res);
          console.log("You are logged in!");
        }
      });
    }
  }

}
