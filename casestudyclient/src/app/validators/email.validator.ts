import { AbstractControl } from '@angular/forms';
export function ValidateEmail(
  control: AbstractControl
): { invalidEmail: boolean } | null {
  const email_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email_REGEXP.test(control.value) ? { invalidEmail: true } : null;
} // Validateemail
