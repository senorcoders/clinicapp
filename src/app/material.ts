
import {MatButtonModule } from '@angular/material';
import {MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';

import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  imports: [ MatSliderModule, MatNativeDateModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSidenavModule, MatTreeModule, MatExpansionModule, MatTableModule, MatDialogModule, MatInputModule, MatAutocompleteModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule],
  exports: [ MatSliderModule, MatNativeDateModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSidenavModule, MatTreeModule, MatExpansionModule, MatTableModule, MatDialogModule, MatInputModule, MatAutocompleteModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule],
})
export class MyMaterialModule { }