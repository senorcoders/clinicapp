import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tsel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService ) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;
    let res: any;
    if (val.email && val.password) {
        this.authService.login(val.email, val.password);
        
    }
}

}
