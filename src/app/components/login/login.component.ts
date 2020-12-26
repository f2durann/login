import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  //'./login.component.html'
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbservis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail: string, parola: string) {
    this.fbservis.OturumAc(mail, parola).then((d: { user: any; }) => {
      if (d.user) {
        localStorage.setItem("user", JSON.stringify(d.user));
        this.router.navigate(['/']);
      }
    }, () => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "E-Posta Adresi veya Parola Geçersizdir!";
    });
  }
}
