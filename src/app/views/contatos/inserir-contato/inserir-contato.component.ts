import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css']
})
export class InserirContatoComponent implements OnInit{
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router, private toastService: ToastrService){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(campo: string): boolean{
    const estaInvalido: boolean = !this.form.get(campo)!.pristine && this.form.get(campo)!.invalid;

    return estaInvalido;
  }

  get email() {
    return this.form.get('email');
  }

  gravar(){
    if(this.form.invalid){
      const camposParaValidar = [
        { campo: 'nome', mensagem: '* O nome é obrigatório'},
        { campo: 'email', mensagem: '* O email é obrigatório'},
        { campo: 'telefone', mensagem: '* O telefone é obrigatório'},
        { campo: 'cargo', mensagem: '* O cargo é obrigatório'},
        { campo: 'empresa', mensagem: '* O campo da empresa é obrigatório'},
      ]

      const erros: string[] = [];

      for(let item of camposParaValidar){
        if(this.form.get(item.campo)?.invalid){
          erros.push(item.mensagem);
        }

        if(this.form.get('email')?.errors?.['email']){
          erros.push('Digite um email valido')
        }
      }

      for(let item of erros){
        this.toastService.error(item, 'Erro no envio do Formulário');
      }

      return;
    }
    
    this.contatoVM = this.form.value;

    this.contatoService.inserir(this.contatoVM).subscribe((res) => {
      this.router.navigate(['/contatos/listar'])
    });
    
  }
}
