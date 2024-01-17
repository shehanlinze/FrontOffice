import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Devices } from 'src/app/models/Devices';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.scss']
})
export class UpdateDeviceComponent {
  idDev:any
  device?:Devices
  updateNoteForm:FormGroup
  noteDeviceUpdated: Devices;

  noty=""
constructor( private classSer:ClasseServiceService ,private fb: FormBuilder,
  public bsModalRef: BsModalRef,){
  this.updateNoteForm = this.fb.group({
    note1: [''],
  });
  this.noteDeviceUpdated = {
    _id: '',
    brand: '',
    reference: '',
    note: '',
    classId: '',
  };
}
close() {
  this.bsModalRef.hide();
}
updateNote() {
  if (this.updateNoteForm.valid && this.device) {
    this.noteDeviceUpdated.note = this.updateNoteForm.get('note1')!.value;
    this.noteDeviceUpdated.brand = this.device.brand;
    this.noteDeviceUpdated.reference = this.device.reference;
    this.noteDeviceUpdated.classId = this.device.classId;
    this.classSer
      .updateNoteDevice(this.idDev, this.noteDeviceUpdated)
      .subscribe((data) => {
        console.log('data', data);
        if (data){
          Swal.fire({
            text: 'لقد تم تعديل الملاحظات بنجاح .',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }})}},
      )
  }
}
ngOnInit():void{
this.classSer.getDeviceById(this.idDev).subscribe(data=>{
this.device=data
this.noty=data.note
console.log("kk",this.device)
})


  console.log("object",this.idDev)
}
}
