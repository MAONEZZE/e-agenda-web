import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private router: Router,private toastService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  login(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(login: any){
    this.toastService.success(`Seja Bem Vindo, ${login.usuarioToken.nome}`, 'Sucesso');
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
