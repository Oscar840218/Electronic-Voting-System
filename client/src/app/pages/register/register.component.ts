import { AuthServiceService } from './../../service/auth-service.service';
import { Candidate } from './../../models/candidate';
import { Profile } from './../../models/profile';
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  processing = false;
  showMessage = false;
  messageClass;
  message;
  form: FormGroup;
  user: User;
  profile: Profile;
  candidate: Candidate;
  username_repeat = false;
  username_repeat_msg: string;
  role: string;

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
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(15)
      ])],
      first_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        this.validateTextInput
      ])],
      last_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        this.validateTextInput
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ])],
      state: ['', Validators.compose([
        Validators.required
      ])],
      gender: ['', Validators.compose([
        Validators.required
      ])],
      age: ['', Validators.compose([
        Validators.required
      ])],
      election_state: ['', Validators.compose([
        Validators.required
      ])],
      introduction: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)
      ])],
      role: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  validateTextInput(controls) {
    const regExp = new RegExp(/^[a-zA-Z]/);

    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateTextInput': true };
    }
  }


  onRoleChange(role) {
    this.role = role;
    if (role === 'CITIZEN') {
      this.isCitizen();
    } else if (role === 'CANDIDATE') {
      this.isCandidate();
    }
  }

  isCitizen() {
    this.form.controls['introduction'].disable();
    this.form.controls['election_state'].disable();
  }

  isCandidate() {
    this.form.controls['introduction'].enable();
    this.form.controls['election_state'].enable();
  }


  onRegisterSubmit() {
    this.processing = true;
    this.user = new User();
    this.profile = new Profile();

    this.profile.name =  this.form.get('last_name').value + ' ' + this.form.get('first_name').value;
    this.profile.email = this.form.get('email').value;
    this.profile.address = this.form.get('address').value;
    this.profile.age = this.form.get('age').value;
    this.profile.gender = this.form.get('gender').value;
    this.profile.state = this.form.get('state').value;

    this.user.resident_id = this.form.get('resident_id').value;
    this.user.role = this.role;
    this.user.profile = this.profile;

    if (this.role === 'CANDIDATE') {
      this.candidate = new Candidate();
      this.candidate.area = this.form.get('election_state').value;
      this.candidate.introduction = this.form.get('introduction').value;
      this.candidate.name = this.form.get('last_name').value + ' ' + this.form.get('first_name').value;
      this.user.candidate = this.candidate;
    }



    this.authServiceService.registerUser(this.user).subscribe(
      (data) => {
        this.messageClass = 'alert alert-success';
        this.message = 'Register Success!'
        this.showMessage = true;
        console.log(data)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000)
      },
      (err) => {
        this.messageClass = 'alert alert-danger';
        this.message = 'Register Failed!'
        this.showMessage = true;
        console.log(err);

        this.processing = false;
      }
    );

  }

  ngOnInit() {
  }

}
