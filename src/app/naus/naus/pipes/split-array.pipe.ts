import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitArray'
})
export class SplitArrayPipe implements PipeTransform {

  transform(value: string): string[] {
    return value ? value.split(',').filter(x => x) : [];
  }

}
