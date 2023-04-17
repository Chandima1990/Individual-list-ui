import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models';

@Pipe({
  name: 'addressListString'
})

/**
 * This pipe is used to convert an array of addresses to a string
 */
export class AddressListStringPipe implements PipeTransform {

  transform(value: Address[], ...args: unknown[]): string {
    return value.map((a, index) =>
      `${index + 1}) ${a.street}, ${a.city}, ${a.country}`)
      .join('; ');
  }

}
