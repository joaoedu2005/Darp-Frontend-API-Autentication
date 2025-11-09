import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../..//app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col items-center w-full max-w-150 mx-7 text-black ">

      <!-- Título -->
      <header class="text-center mb-8">
        <h1 class="!text-[40px] font-semibold text-purple-600">Crie sua conta</h1>
        <p class="text-sm text-black/60 mt-1">
          Preencha seus dados para começar.
        </p>
      </header>

      <!-- Card / Form -->
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="w-full bg-white/95 border border-gray-200 rounded-3xl shadow-lg p-10 backdrop-blur transition-all duration-300 hover:shadow-[0_15px_35px_-12px_rgba(2,6,23,0.25)]"
      >
        <!-- GRID 2 COLUNAS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ml-3! mr-2!">
          <!-- Usuário -->
          <div class="flex flex-col gap-2">
            <label for="username" class="text-[18px] font-medium text-black">Usuário</label>
            <input
              id="username"
              type="text"
              formControlName="username"
              placeholder="seu_usuario"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
            />
            <small class="text-red-600" *ngIf="submitted && form.controls.username.invalid">
              Informe um usuário
            </small>
          </div>

          <!-- Nome -->
          <div class="flex flex-col gap-2">
            <label for="name" class="text-[18px] font-medium text-black">Nome</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Seu nome completo"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
            />
            <small class="text-red-600" *ngIf="submitted && form.controls.name.invalid">
              Informe o nome
            </small>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label for="email" class="text-[18px] font-medium text-black">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="exemplo@gmail.com"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
            />
            <small class="text-red-600" *ngIf="submitted && form.controls.email.invalid">
              Email inválido
            </small>
          </div>

          <!-- Telefone -->
          <div class="flex flex-col gap-2">
            <label for="phone" class="text-[18px] font-medium text-black">Telefone</label>
            <input
              id="phone"
              type="text"
              formControlName="phone"
              placeholder="(xx) x xxxx-xxxx"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
            />
            <small class="text-red-600" *ngIf="submitted && form.controls.phone.invalid">
              Informe o telefone
            </small>
          </div>

          <!-- Data de nascimento -->
          <div class="flex flex-col gap-2">
            <label for="dateBirth" class="text-[18px] font-medium text-black">Data de nascimento</label>
            <input
              id="dateBirth"
              type="date"
              formControlName="dateBirth"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin!"
            />
            <small class="text-red-600" *ngIf="submitted && form.controls.dateBirth.invalid">
              Informe a data (YYYY-MM-DD)
            </small>
          </div>

          <!-- Observação -->
          <div class="flex flex-col gap-2">
            <label for="note" class="text-[18px] font-medium text-black">Observação</label>
            <textarea
              id="note"
              formControlName="note"
              rows="3"
              placeholder="(opcional)"
              class="w-70 outline-3 outline-offset-0 outline-purple-600 rounded-md! border-2 border-gray-200 px-5 py-3.5 
                     transition-all duration-200 hover:ring-7 hover:ring-black
                     focus:ring-purple-300 hover:border-purple-500 placeholder:font-thin! resize-none!"
            ></textarea>
          </div>
        </div>

        <!-- AÇÕES -->
        <div class="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            type="submit"
            [disabled]="loading"
            class="text-white! bg-purple-600! hover:text-purple-700! transition-all! duration-200! 
               font-medium! px-3! py-1.5! rounded-lg! hover:bg-black! w-35"
          >
            {{ loading ? 'Salvando...' : 'Cadastrar' }}
          </button>

          <button
            type="button"
            class="text-purple-600 hover:text-purple-700 transition-all duration-200 
                   font-medium px-6 py-3 rounded-xl hover:bg-purple-50 w-full md:w-auto underline cursor-pointer"
            (click)="switchToLogin.emit()"
          >
            Já tem conta? Entrar
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center my-6 gap-2">
          <hr class="flex-1 border-t-2 border-gray-100" />
          <span class="px-4 text-sm font-medium text-gray-400">or</span>
          <hr class="flex-1 border-t-2 border-gray-100" />
        </div>

        <!-- Social -->
        <div class="grid gap-4">
          <button
            type="button"
            class="flex items-center justify-center gap-3 border-2 border-gray-200 
                   rounded-2xl py-3.5 px-4 bg-white hover:bg-gray-50 
                   active:scale-[.99] transition-all duration-200 
                   shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer"
          >
            <i class="bi bi-google text-xl"></i> 
            <span class="text-base font-medium text-gray-700">Sign in with Google</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 border-2 border-gray-200 
                   rounded-2xl py-3.5 px-4 bg-white hover:bg-gray-50 
                   active:scale-[.99] transition-all duration-200 
                   shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer ">
            <i class="bi bi-apple text-xl text-gray-900"></i> 
            <span class="text-base font-medium text-gray-700">Sign in with Apple</span> 
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = false;
  submitted = false;

  form = this.fb.group({
    username: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    dateBirth: ['', [Validators.required]], // "YYYY-MM-DD"
    note: [''],
  });

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    const dto = { ...this.form.value } as any;

    if (dto.dateBirth instanceof Date) {
      dto.dateBirth = dto.dateBirth.toISOString().slice(0, 10);
    }

    this.auth.register(dto).subscribe({
  next: (res) => {
    if(res?.user){
    alert(res.message || 'Usuário criado com sucesso!');
    this.form.reset();
    this.submitted = false;
    this.loading = false;
    } else {
      alert(res?.message || 'Não foi possível criar o usuário');
    }
    this.loading = false;
  },
  error: (err) => {
    alert(err.message || 'Erro ao registrar.');
    this.loading = false;
  },
});
  }
}
