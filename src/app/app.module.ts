import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { ContatosModule } from './views/contatos/contatos.module';
import { HttpClientModule } from '@angular/common/http';
import { CompromissosModule } from './views/compromissos/compromissos.module';
import { RegistroModule } from './views/registro/registro.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';

function logarUsuarioSalvoFactory(authService: AuthService){
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    BrowserAnimationsModule, //Para poder usar o toastr

    HttpClientModule,
    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,

    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true //Serve para quando vc quiser criar varias vezes esse provider exemplo a baixo
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: logarUsuarioSalvoFactory,
    //   deps: [AuthService],
    //   multi: true 
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
