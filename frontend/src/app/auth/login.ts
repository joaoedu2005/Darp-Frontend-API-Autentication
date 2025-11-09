import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../app/core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col items-center w-full max-w-150 mx-7 text-black ">
      <!-- Título -->
      <header class="text-center mb-8">
        <h1 class="!text-[40px] font-semibold text-purple-600">Bem vindo!</h1>
        <p class="text-sm text-black/60 mt-1">Insira suas credenciais para continuar.</p>
      </header>

      <!-- Form -->
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="w-full flex flex-col gap-8 bg-white/95 border border-gray-200 rounded-3xl shadow-lg p-10 backdrop-blur transition-all duration-300 hover:shadow-[0_15px_35px_-12px_rgba(2,6,23,0.25)]"
      >
        <!-- Email -->
        <div class="flex flex-col gap-3 mt-2! ml-2! items-center">
          <label for="email" class="block text-[18px] font-medium text-black">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="exemplo@gmail.com"
            class=" w-xs outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                   transition-all duration-200 hover:ring-7 hover:ring-black
                   focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
          />
          <small class="text-red-600" *ngIf="submitted && form.controls.email.invalid">Email inválido</small>
        </div>

        <!-- Password (visual apenas) -->
        <div class="flex flex-col gap-3 ml-2! items-center">
          <div class="flex justify-between items-center px-1 w-full max-w-[20rem]">
            <label for="senha" class="text-[18px] font-medium text-black">Senha</label>
            <button
              type="button"
              class="text-[12px]! mr-2! font-light! text-purple-600 hover:text-purple-700 
                     transition-colors duration-200 underline decoration-solid cursor-pointer px-2 py-1 
                     rounded-lg hover:bg-purple-50"
              (click)="alertaEsqueciSenha()"
            >Esqueceu a senha?</button>
          </div>
          <input
            id="senha"
            type="password"
            formControlName="password"
            placeholder="Digite sua senha"
            class=" w-xs outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                   transition-all duration-200 hover:ring-7 hover:ring-black
                   focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
          />
        </div>

        <!-- Ações -->
        <div class="flex flex-row w-full justify-center items-center text-sm px-1 gap-8">
          <button
            type="submit"
            [disabled]="loading"
            class="text-white! bg-purple-600! hover:text-purple-700! transition-all! duration-200! 
                   font-medium! px-3! py-1.5! rounded-lg! hover:bg-black! w-35 disabled:opacity-60"
          >
            {{ loading ? 'Entrando...' : 'Login' }}
          </button>

          <label class="flex items-center gap-1 cursor-pointer select-none">
            <input type="checkbox"
             formControlName="remember"
             class="h-4 w-3! accent-purple-600! rounded-md! border-2! border-gray-300!"  name="remember"/>
            <span class="text-black">Lembrar de mim</span>
          </label>
        </div>

        <!-- Criar conta -->
        <div class="flex justify-center items-center text-sm px-1">
          <button
            type="button"
            class="text-white! bg-purple-600! hover:text-purple-700! transition-all! duration-200! 
                   font-medium! px-3! py-1.5! rounded-lg! hover:bg-black!"
            (click)="switchToRegister.emit()"
          >
            Create account
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center my-6 gap-2">
          <hr class="flex-1 border-t-2 border-gray-100" />
          <span class="px-4 text-sm font-medium text-gray-400">or</span>
          <hr class="flex-1 border-t-2 border-gray-100" />
        </div>

        <!-- Social (visual) -->
        <div class="grid gap-4">
          <button type="button"
            class="flex items-center justify-center gap-3 border-2 border-gray-200 
                   rounded-2xl py-3.5 px-4 bg-white hover:bg-gray-50 
                   active:scale-[.99] transition-all duration-200 
                   shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer">
            <i class="bi bi-google text-xl"></i>
            <span class="text-base font-medium text-gray-700">Sign in with Google</span>
          </button>
          <button type="button"
            class="flex items-center justify-center gap-2 border-2 border-gray-200 
                   rounded-2xl py-3.5 px-4 bg-white hover:bg-gray-50 
                   active:scale-[.99] transition-all duration-200 
                   shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer">
            <i class="bi bi-apple text-xl text-gray-900"></i>
            <span class="text-base font-medium text-gray-700">Sign in with Apple</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = false;
  submitted = false;
  remember = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]], // apenas visual; API não valida
    remember: [true],
  });

  alertaEsqueciSenha() {
    alert('Este backend não possui recuperação de senha. (A API de teste não tem senha.)');
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    const email = this.form.value.email!.trim().toLowerCase();

    // Busca todos e filtra por email (já que não há /auth/login)
    this.auth.findUserByEmail(email).subscribe({
      next: (users) => {
        const found = (users as User[]).find(u => u.email.toLowerCase() === email);
        if (!found) {
          alert('Usuário não encontrado. Cadastre-se antes de entrar.');
          this.loading = false;
          return;
        }

        // “Efetua login” no front: guarda no storage
        const storage = this.form.value.remember ? localStorage : sessionStorage;
        storage.setItem('auth_user', JSON.stringify(found));
        alert(`Bem-vindo, ${found.name}! (login simulado)`);
        this.loading = false;

        // Aqui você poderia navegar p/ outra rota (ex.: /users)
        // this.router.navigateByUrl('/users');
      },
      error: (err) => {
        alert(err.message || 'Erro ao buscar usuários.');
        this.loading = false;
      },
    });
  }
}
