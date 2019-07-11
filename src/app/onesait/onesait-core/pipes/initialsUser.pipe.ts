import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initialsUser' })
export class InitialsUser implements PipeTransform {
        isCapital(letra) {
        return letra === letra.toUpperCase();
    }
    transform(user: string): any {
        let userInitials = '';
        let longInitial = 2;
        let userArr = user.split(' ');
        for (let ii = 0; ii < userArr.length; ii++) {
            let word = userArr[ii];
            let letter = word.charAt(0);
            if (this.isCapital(letter)) {
                userInitials += letter;
            }
        }
        let auxUserInitial = userInitials.slice(0, longInitial);
        return auxUserInitial;
    }
}
