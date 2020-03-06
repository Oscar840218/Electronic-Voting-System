import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  processing = false;
  showMessage = false;
  messageClass;
  message;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServiceService: AuthServiceService
  ) { this.createForm() }

  createForm() {
    this.form = this.formBuilder.group({
      resident_id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])]
    });
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.processing = true;
    this.form.controls['resident_id'].disable();

    const resident_id = this.form.get('resident_id').value;

    this.authServiceService.login(resident_id).subscribe(
      (data) => {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.showMessage = true;
        this.authServiceService.storeUserData(data.token, data.role);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000)
      },
      (err) => {
        this.messageClass = 'alert alert-danger';
        this.message = 'Login failed';
        this.showMessage = true;

        this.processing = false;
        this.form.controls['resident_id'].enable();
      }
    )
  }

}
