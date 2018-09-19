import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { CheckupsComponent } from '../checkups/checkups.component';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';

export interface State {
  flag: string;
  name: string;
  population: string;
}


@Component({
  selector: 'tsel-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {


  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(  public dialog: MatDialog ) { 
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
   }

  ngOnInit() {
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  openAvatarModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '5ba0357ce01ba104ac9ea7a6',
      title: 'Patient Image'
    };
    const dialogRef = this.dialog.open(UploadAvatarComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
    });
  }

  openPrescriptionModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '5ba0357ce01ba104ac9ea7a6',
      title: 'Prescription'
    };
    const dialogRef = this.dialog.open(PrescriptionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
    });
  }

  openCheckupsModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '5ba0357ce01ba104ac9ea7a6',
      title: 'Checkups'
    };
    const dialogRef = this.dialog.open(CheckupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
    });
  }

}
