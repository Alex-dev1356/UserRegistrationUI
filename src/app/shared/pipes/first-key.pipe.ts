import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKey',
  standalone: true
})
export class FirstKeyPipe implements PipeTransform {


  transform(value: any): string | null // To transform the value into the first key of the object. If the value is not an object or is null, it returns null. 
  {
    const keys = Object.keys(value); // To get the keys of the object as an array. This will return an array of the keys in the object, which can be used to access the first key.
    if(keys && keys.length > 0) // To check if the array of keys is not empty. This ensures that there is at least one key in the object before trying to access it.
    {
      return keys[0]; // To return the first key from the array of keys. This will return the first key in the object, which is what we want to display. The key that  we're returning here is the name of the validation error, such as 'required' or 'minlength', 'pattern' etc. which can be used in the template to display the appropriate error message.
    }

    return null;
  }

}
