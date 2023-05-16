import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Person } from './person.interface';

export interface ColumnItem{
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Person> | null;
  sortDirections: NzTableSortOrder[];
}
