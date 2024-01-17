import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Class } from '../models/Class';
import { Devices } from '../models/Devices';

@Injectable({
  providedIn: 'root',
})
export class ClasseServiceService {
  updateNoteDevice(id:String , upDevice:Devices) {
   return this.httpclient.put(`${this.classUrl}/Devices/updateDevices/${id}`,upDevice)

  }
  updateNote(id: String, classWithnewNote: Class) {
    console.log("fi ser",classWithnewNote)
    return this.httpclient.put(
      `${this.classUrl}/classes/updateClasses/${id}`,
      classWithnewNote
    );
  }
  private classUrl = environment.backendUrl;
  constructor(private httpclient: HttpClient) {}

  //Affiche all classes
  getAllClasses(): Observable<Class[]> {
    return this.httpclient.get<Class[]>(
      `${this.classUrl}/classes/getAllClasses`
    );
  }

  // affiche classe by id
  getClassById(id: string): Observable<Class> {
    return this.httpclient.get<Class>(
      `${this.classUrl}/classes/getClassDetails/${id}`
    );
  }
// affiche device by id
getDeviceById(id: string): Observable<Devices> {
  return this.httpclient.get<Devices>(
    `${this.classUrl}/Devices/getDeviceById/${id}`
  );
}
  //affiche device for class
  getDeviceByClass(classId: string): Observable<Devices[]> {
    return this.httpclient.get<Devices[]>(
      `${this.classUrl}/classes/allDevicesForClass/${classId}`
    );
  }
}
