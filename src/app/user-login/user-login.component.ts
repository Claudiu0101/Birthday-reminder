import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  signupUsers: any[] = [];
  signupObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword:''
  }

  loginObj: any = {
    email: '',
    password: ''
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }

  }
  onSignUp() {
    const emailRegex = /^[^\s@]+@(yahoo\.com|gmail\.com)$/i;
    if (!emailRegex.test(this.signupObj.email)) {
      alert('Adresa de e-mail introdusă nu este validă. Adresele de e-mail acceptate se termina in  @yahoo.com sau @gmail.com.');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(this.signupObj.password)) {
      alert('Parola trebuie să conțină cel puțin 6 caractere, o literă mare, o literă mică, o cifră și un caracter special (@ $ ! % * ? &).');
      return;
    }
    if (this.signupObj.password != this.signupObj.confirmPassword) {
      alert('Parolele nu coincid. Te rugam sa introduci aceeasi parola in ambele campuri.');
      return;
    }
  
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }


  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password);
    console.log(this.loginObj.email);
    console.log(this.loginObj.password)
    if (isUserExist != undefined) {
      alert('User Login Successfully');
      this.router.navigateByUrl('/home');
    } else {
      alert('Wrong credentials');
    }
  }
}
