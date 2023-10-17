import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,private toastService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  registrar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }

    this.authService.registrar(this.form.value).subscribe({
      next: (token) => this.processarSucesso(token),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(registro: any){
    this.toastService.success(`${registro.usuarioToken.nome} foi registrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
