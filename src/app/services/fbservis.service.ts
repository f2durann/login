import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kayit } from '../models/kayit';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  private dbKayit = '/Kayitlar';
  kayitRef: AngularFireList<Kayit>;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth

  ) {
    this.kayitRef = db.list(this.dbKayit);
  }
  KayitListele() {
    return this.kayitRef;
  }

  KayitEkle(k: Kayit) {
    return this.kayitRef.push(k);
  }

  KayitDuzenle(k: Kayit) {
    return this.kayitRef.update(k.key, k);

  }

  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
}
