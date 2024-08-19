import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeService {
  private errorMessages: { [key: string]: string } = {
    "USER_ALREADY_EXISTS": "Username is already taken. Please choose another.",
    "PASSWORD_MISMATCH": "The passwords you entered do not match. Please try again.",
    // Add more error codes and messages as needed
  };

  getErrorMessage(errorCode: string): string {
    return this.errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
  }
}
