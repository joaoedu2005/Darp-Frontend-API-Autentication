import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { catchError, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  dateBirth: string; // "YYYY-MM-DD"
  phone: string;
  note?: string;
}

export interface RegisterDto {
  name: string;
  username: string;
  email: string;
  dateBirth: string; // YYYY-MM-DD
  phone: string;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  register(dto: RegisterDto) {
    return this.http
      .post<{ message: string; user?: RegisterDto }>(`${this.base}/auth/register`, dto)
      .pipe(catchError(this.handleError));
  }

  // útil para checar se o usuário foi salvo
  getUsers() {
    return this.http.get<any[]>(`${this.base}/user`).pipe(catchError(this.handleError));
  }

  getUserByUsername(username: string) {
  return this.http.get<User | { message: string }>(`${this.base}/user/${username}`)
    .pipe(catchError(this.handleError));
  }

  findUserByEmail(email: string) {
  return this.getUsers();
  }

  private handleError(err: HttpErrorResponse) {
    // Backend retorna {message: "..."} sempre
    const msg =
      (err.error && (err.error.message || err.error.error || JSON.stringify(err.error))) ||
      err.message ||
      'Erro desconhecido';
    return throwError(() => new Error(msg));
  }

  
}
