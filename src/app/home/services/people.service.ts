import { Injectable } from '@angular/core';
import peopleData from './people.json';
import { Person } from '../interfaces/person.interface';
import { Subject } from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private personList: Person[] = peopleData;
  personListSubject: Subject<Person[]> = new Subject<Person[]>();

  constructor() {}

  get people() {
    return this.personList;
  }

  set people(people: Person[]) {
    this.personList = people;
  }

  addPerson(person: Person) {
    let max = _.maxBy(this.personList, 'id')!.id;
    let newPerson: Person = {
      id: max + 1,
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
      city: person.city,
      birthDate: person.birthDate,
      wishList: person.wishList,
    };
    this.personList.push(person); ///this.personList.push(person);
    }
}
