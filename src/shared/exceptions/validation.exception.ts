import { ValidationError } from 'class-validator';

export class ValidationException {
  message = 'Validation Failed!';
  errors;

  constructor(errors: ValidationError[]) {
    this.errors = this.parseValidationErrors(errors);
  }

  private parseValidationErrors(validationErrors: ValidationError[]): string[] {
    return validationErrors.reduce((errors: any, error: any) => {
      if (error.children.length) {
        errors[error.property] = this.parseValidationErrors(error.children);
      } else {
        errors[error.property] = Object.values(error.constraints).slice(0, 1);
      }

      return errors;
    }, {});
  }
}
