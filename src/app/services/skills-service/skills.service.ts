import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private dbPath = '/skills';
  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  
  getSkills(): Observable<Skills[]> {
    return this.skillsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,  // Se asigna el ID del documento
          ...c.payload.doc.data() as Skills // Se asegura que los datos coincidan con el modelo
        }))
      )
    );
  }
}

