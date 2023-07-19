import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  // Gera uma string com caracteres aleatórios.
  // Isso deveria estar em um service.
  getRandomChars(n: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sequence = '';
    for (let i = 0; i < n; i++) {
      const rndi = Math.floor(Math.random() * chars.length);
      sequence += chars.charAt(rndi);
    }
    return sequence;
  }

  // Valida o preenchimento dos campos do formulário em tempo real.
  // OBS: isso foi obtido após pesquisas na Internet.
  updateValidationMessages(formGroup: any, formErrors: any, validationMessages: any) {
    for (const field in formErrors) {
      if (Object.prototype.hasOwnProperty.call(formErrors, field)) {
        formErrors[field] = '';
        const control = formGroup.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
