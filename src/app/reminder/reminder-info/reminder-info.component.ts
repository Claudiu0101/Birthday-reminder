import { Person } from './../../home/interfaces/person.interface';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-reminder-info',
  templateUrl: './reminder-info.component.html',
  styleUrls: ['./reminder-info.component.scss'],
})
export class ReminderInfoComponent {

  currentDateNoYear?: string;
  modalVisibility = false;
  notExistModal = false;
  nextPerson: Person = {} as Person;
  daysUntilNextBirthday: number = 0;

  @Input() set listOfBirthdays(value: Person[]) {
    this.localBirthdays = _.cloneDeep(value);
  }

  localBirthdays!: Person[];  //declarata dar va fi initializata mai jos in cod
  resultToShow?: Person; //optionala, poate fi undefined

  constructor(private datePipe: DatePipe) { }

  loadNextBirthday() {
    let today = new Date();
    let currentDate = this.datePipe.transform(today, 'yyyy-MM-dd');
    let currentYear = currentDate!.substring(0, 4);  // nu este null sau undefined

    const dictionar: { [id: number]: number } = {};
    let futureBirthday = false;  // există aniversări viitoare

    _.forEach(this.localBirthdays, (b) => {
      let birthDate = this.datePipe.transform(b.birthDate, 'yyyy-MM-dd');

      birthDate = birthDate!.slice(4);   // păstrăm doar luna și ziua
      birthDate = currentYear + birthDate;  // dată completă a aniversării în anul curent
      let difference = new Date(birthDate).valueOf() - new Date().valueOf();

      if (difference >= 0) {
        futureBirthday = true;
      }
      dictionar[b.id] = difference;
    });

    let id: string;
    let value;
    let daysUntilNextBirthday = Infinity; // Inițializăm cu un număr mare pentru a găsi cel mai mic număr de zile rămase

    if (this.localBirthdays.length > 0) {
      if (futureBirthday) {
        value = new Date().valueOf();
        for (let key in dictionar) {
          if (dictionar[key] > 0 && dictionar[key] <= value) {
            id = key;
            value = dictionar[key];
            // Calculează numărul de zile rămase până la următoarea aniversare
            const daysRemaining = Math.floor(value / (1000 * 60 * 60 * 24));
            if (daysRemaining < daysUntilNextBirthday) {
              daysUntilNextBirthday = daysRemaining;
            }
          }
        }
      } else {
        value = 0;
        for (let key in dictionar) {
          if (dictionar[key] <= value) {
            id = key;
            value = dictionar[key];
            // Calculează numărul de zile rămase până la următoarea aniversare
            const daysRemaining = Math.floor(value / (1000 * 60 * 60 * 24));
            if (daysRemaining < daysUntilNextBirthday) {
              daysUntilNextBirthday = daysRemaining;
            }
          }
        }
      }
      const index = this.localBirthdays.findIndex(
        (item) => item.id == Number(id)
      );
      this.nextPerson = this.localBirthdays[index];
      this.daysUntilNextBirthday = daysUntilNextBirthday;
      //console.log("Zile rămase până la următoarea zi de naștere: ", daysUntilNextBirthday);
    }
  }

  handleOk() {
    this.modalVisibility = false;
  }

  handleClose() {
    this.modalVisibility = false;
  }

  handleExistOk() {
    this.notExistModal = false;
  }

  handleExistClose() {
    this.notExistModal = false;
  }

  showModal() {
    if (this.localBirthdays.length > 0) {
      this.modalVisibility = true;
      this.loadNextBirthday();
    } else {
      this.notExistModal = true;
    }
  }
}
