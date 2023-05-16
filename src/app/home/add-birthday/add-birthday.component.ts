import { Component } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { PeopleService } from '../services/people.service';
import { Route, Router } from '@angular/router';
import { Person } from '../interfaces/person.interface';
import { format, compareAsc } from 'date-fns'

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss'],
})
export class AddBirthdayComponent {
  personForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.personForm.valid) {
      let newPerson: Person = {
        id: 0,
        firstName: this.personForm.value.firstName,
        lastName: this.personForm.value.lastName,
        phoneNumber: this.personForm.value.phoneNumber,
        city: this.personForm.value.city,
        birthDate: format(this.personForm.value.birthDate, 'yyyy-MM-dd'),
        wishList: this.personForm.value.wishList,
      };  
      this.peopleService.addPerson(newPerson);
      this.router.navigateByUrl('/home');
    } else {
      Object.values(this.personForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private peopleService: PeopleService, private router: Router) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      city: [null, [Validators.required]],
      birthDate: [null, Validators.required],
      wishList: this.fb.array([]),
    });
  }

  wishes(): UntypedFormArray {
    return this.personForm.get('wishList') as UntypedFormArray;
  }

  newWish(): UntypedFormGroup {
    return this.fb.group({
      wish: [null, Validators.required],
    });
  }

  addWish() {
    this.wishes().push(this.newWish());
  }

  removeWish(i: number) {
    this.wishes().removeAt(i);
  }
}
