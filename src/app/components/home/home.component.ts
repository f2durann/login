import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Kayitlar: any;
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false
  silme: boolean = false;
  constructor(
    public fbservis: FbservisService,  //fb servis çağırıldı
    public router: Router

  ) { }

  ngOnInit() {
    this.KayitLislele();
  }
  KayitLislele() {
    this.fbservis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Kayitlar = data;
    });
  }
  Kaydet() {
    var tarih = new Date();
    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
      this.fbservis.KayitEkle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    } else {
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
      this.fbservis.KayitDuzenle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }

  KayitSec(k: Kayit) {
    Object.assign(this.secKayit, k);

  }

  Sil() {

    this.fbservis.KayitSil(this.secKayit.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.silme = false;
    });
  }

  TamamlaIptal(k: Kayit, islem: boolean) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbservis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    });

  }
  OturumuKapat() {
    this.fbservis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
}
