import { Pipe, PipeTransform } from '@angular/core';
import {Assignment} from '../models/Assignment';

@Pipe({
  name: 'dateFliter'
})
export class DateFliterPipe implements PipeTransform {

  transform(assignments:Assignment[]): any {
    return assignments?assignments.filter(
    function(a) {

     console.log(new Date(a.duedate));
      return new Date(a.duedate)>new Date();
    }
    ):assignments;
  }

}
