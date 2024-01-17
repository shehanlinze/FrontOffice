import { UpdateDeviceComponent } from './../update-device/update-device.component';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/models/Class';
import { Devices } from 'src/app/models/Devices';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-details-classes',
  templateUrl: './details-classes.component.html',
  styleUrls: ['./details-classes.component.scss'],
})
export class DetailsClassesComponent implements OnInit {
  classy!: Class;
  devices: Devices[] = [];
  lenclassDevices = 0;
  editing: boolean = false;
  device: any;
  upNoteClasse: FormGroup;
  noteClassUpdated: Class;
  noteClass: any;
  constructor(
    private modalService: BsModalService,
    private translateserviece: TranslateService,
    private route: ActivatedRoute,
    private classeservice: ClasseServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.translateserviece.setDefaultLang('ar');
    this.upNoteClasse = this.fb.group({
      note: [''],
    });
    this.noteClassUpdated = {
      building: '',
      note: '',
      capacityOfStudent: 0,
      department: '',
      _id: '',
      type: '',
      name: '',
    };
  }
  updateNoteClasse(id: String) {
    if (this.upNoteClasse.valid && this.classy) {
      this.noteClassUpdated.name = this.classy.name;
      this.noteClassUpdated.building = this.classy.building;
      this.noteClassUpdated.capacityOfStudent = this.classy.capacityOfStudent;
      this.noteClassUpdated.department = this.classy.department;
      this.noteClassUpdated.type = this.classy.type;

      this.noteClassUpdated.note = this.upNoteClasse.get('note')!.value;
      console.log('new', this.noteClassUpdated);
      this.classeservice
        .updateNote(id, this.noteClassUpdated)
        .subscribe((data) => {
          if (data) {
            Swal.fire({
              text: 'لقد تم تعديل الملاحظات بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
    }
  }

  edit(): void {
    this.editing = true;
  }
  open(id: string) {
    const initialState = {
      idDev: id,
    };
    const modalRef: BsModalRef = this.modalService.show(UpdateDeviceComponent, {
      initialState,
    });
  }

  cancelEdit(): void {
    this.editing = false;
  }
  ngOnInit(): void {
    if (localStorage.getItem('isLogged') != 'true')
      this.router.navigateByUrl('/login');
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.viewClassDetails(id);
        this.afficheDeviceClasse(id);
      }
    });
  }
  viewClassDetails(id: string): void {
    this.classeservice.getClassById(id).subscribe((data: Class) => {
      this.classy = data;
      this.noteClass = data.note;
      console.log(data);
    });
  }

  afficheDeviceClasse(classId: string): void {
    this.classeservice.getDeviceByClass(classId).subscribe(
      (data) => {
        this.devices = data;
        this.lenclassDevices = this.devices.length;

        console.log(this.devices);
      },
      (error) => {
        console.log('Erreur lors de la récupération des devices', error);
      }
    );
  }

  urlImg: string = './assets/img/carousel-1.jpg';
}
