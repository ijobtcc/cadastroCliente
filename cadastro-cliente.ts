import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../providers/auth/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';
import { MenuPage } from '../menu/menu';



@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',

})
export class CadastroClientePage {
  user : User = new User();
  @ViewChild ('form') form : NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroClientePage');
  }

  goToHomePage()
  {
  this.navCtrl.push(HomePage)
  }

  CriarConta()
  {
    if(this.form.form.valid)
    {
      let toast = this.toastCtrl.create({
        message: 'Usuario cadastrado com sucesso!',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      
      this.authService.CriarUsuario(this.user)

    
      .then((user: any) => 
      {
        user.sendEmailVerification();

        toast.setMessage('Usuário cadastrado com sucesso!! :D ');
        toast.present();
        this.navCtrl.setRoot(MenuPage);
      })

      .catch((error: any) => 
      {
        if(error.code =='auth/email-already-in-use')
        {
          toast.setMessage('Este e-mail ja esta em uso!');
        }

        else if(error.code =='auth/invalid-email')
        {
          toast.setMessage('Email digitado não é valido!');
        }

        else if(error.code =='auth/operation-not-allowed')
        {
          toast.setMessage('Operação não esta disponivel!');
        }

        else if(error.code =='auth/weak-password')
        {
          toast.setMessage('Senha muito fraca!');
        }
        toast.present();
        
      
      });
    }
  }
}
