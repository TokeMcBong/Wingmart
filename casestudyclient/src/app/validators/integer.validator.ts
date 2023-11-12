import { AbstractControl } from '@angular/forms';
export function ValidateInteger(
  control: AbstractControl
): { invalidNumber: boolean } | null {
  const INTEGER_REGEXP = /^\d+$/;
  return !INTEGER_REGEXP.test(control.value) ? { invalidNumber: true } : null;
} // ValidateInteger
