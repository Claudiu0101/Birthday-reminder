import { Component, Input } from '@angular/core';
import { Person } from '../interfaces/person.interface';
import { PeopleService } from '../services/people.service';
import { DatePipe } from '@angular/common';
import { ColumnItem } from '../interfaces/column-item.interface';
import _, { words } from 'lodash';

@Component({
  selector: 'app-birthday-table',
  templateUrl: './birthday-table.component.html',
  styleUrls: ['./birthday-table.component.scss'],
})
export class BirthdayTableComponent {
  currentDate?: string | null;
  currentDateNoYear?: string;

  //listele
  personList: Person[] = [];
  displayPersonList = [...this.personList];

  //cautarea
  itemForSearch: String = '';

  //modal-ul
  visibilityForModal = false;
  showedPerson: Person = {} as Person;

  //sortarea pe fiecare coloana
  listOfColumns: ColumnItem[] = [
    {
      name: 'First Name',
      sortOrder: null,
      sortFn: (a: Person, b: Person) => a.firstName.localeCompare(b.firstName),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Last Name',
      sortOrder: null,
      sortFn: (a: Person, b: Person) => a.lastName.localeCompare(b.lastName),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Phone',
      sortOrder: null,
      sortFn: (a: Person, b: Person) => a.phoneNumber.localeCompare(b.phoneNumber),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'City',
      sortOrder: null,
      sortFn: (a: Person, b: Person) => a.city.localeCompare(b.city),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Birthday',
      sortOrder: null,
      sortFn: (a: Person, b: Person) => a.birthDate.localeCompare(b.birthDate),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Actions',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null, null, null],
    },
  ];

  //ultima versiune a listei de persoane
  constructor(private peopleService: PeopleService) {
    this.peopleService.personListSubject.subscribe((res) => {
      this.displayPersonList = [...res];
    });
  }

  ngOnInit(): void {
    this.personList = this.peopleService.people;
    this.displayPersonList = this.personList;
    this.editCacheUpdate();
  }

  editCache: { [key: string]: { edit: boolean; data: Person } } = {};

  editStarting(id: number): void {
    this.editCache[id].edit = true;
  }
  personDelete(id: number) {
    _.remove(this.personList, (p) => { return p.id == id; });
    this.displayPersonList = _.cloneDeep(this.personList); 
  }

  editCanceling(id: number): void {
    const index = this.personList.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.personList[index] },
      edit: false,
    };
  }

  editSaving(id: number): void {
    const index = this.personList.findIndex((item) => item.id === id);
    Object.assign(this.personList[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  editCacheUpdate(): void {
    this.personList.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  verify(word: String, keyValue: String): boolean {
    if (_.includes(word.toLowerCase(), keyValue.toLowerCase())) { return true;}
    return false;
  }

  searchList() {
    this.displayPersonList = [];
    let itemForSearch = this.itemForSearch;
    // filtrarea persoanelor in functie de cuvantul cautat
    _.forEach(this.personList, (person) => {
      if (this.verify(person.firstName, itemForSearch) || this.verify(person.lastName, itemForSearch) || this.verify(person.city, itemForSearch) || this.verify(person.phoneNumber, itemForSearch) || this.verify(person.birthDate, itemForSearch))
        this.displayPersonList.push(person);
    });
  }

  modalOpen(id: number) {
    this.showedPerson = _.find(this.personList, (p) => { return p.id == id; })!;  ///!-elimina posibilitatea valorii undefined
    this.visibilityForModal = true;
  }
  close() {
    this.visibilityForModal = false;
  }
  ok() {
    this.visibilityForModal = false;
  }
}
