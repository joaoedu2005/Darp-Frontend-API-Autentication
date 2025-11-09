import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from "../../../../auth/login";
import { RegisterComponent } from '../../../../auth/register';


@Component({
  selector: 'app-auth-wrapper',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth-wrapper.html',
  styleUrl: './auth-wrapper.css',
})
export class AuthWrapper {
    isRegister = false; // false = Login | true = Register
  toggle() { this.isRegister = !this.isRegister; }
}
