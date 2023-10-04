import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  constatoVM!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    // this.form.setValue({ O setValue tem que inicializar todos campos, ja o patchValue você pode inicializar só alguns
    //   nome: 'Ruan',
    //   email: 'ruansanchez@gmail.com',
    //   telefone: '11 96357-4015',
    //   cargo: 'aaaaa',
    //   empresa: 'aaaaaaaa',
    // }); 

    this.idSelecionado = this.route.snapshot.paramMap.get('id');
    
    if(!this.idSelecionado){
      return;
    }

    this.contatoService.selecionarPorId(this.idSelecionado! ).subscribe((res) => {
      this.form.patchValue(res);
    })
  }

  campoEstaInvalido(campo: string): boolean{
    return this.form.get(campo)!.touched && this.form.get(campo)!.invalid;
  }

  get email() {
    return this.form.get('email');
  }
  
  gravar(){
    this.constatoVM = this.form.value;

    this.contatoService.editar(this.idSelecionado!, this.constatoVM).subscribe((res) => {
      this.router.navigate(['/contatos/listar'])
    })
  }
}
