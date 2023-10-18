import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  estaColapsado: boolean = true;

  usuarioEstaLogado$?: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService){

  }
  
  ngOnInit(): void {
    this.usuarioEstaLogado$ = this.authService.obterUsuarioAutenticado()
      .pipe(
        map((usuario) => {
          if(!usuario){
            return false;
          }

          return true;
        })
      )
  }

  sair(){
    this.authService.logout().subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.toastService.success(`Logout com sucesso!`, 'Sucesso');
    this.router.navigate(['/login']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
