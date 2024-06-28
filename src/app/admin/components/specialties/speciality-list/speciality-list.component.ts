import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { SpecialityModel } from '../../../../contracts/models/speciality-model';
import { SpecialityWithCardImageModel } from '../../../../contracts/models/speciality-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { SpecialityImageAddDialogComponent } from '../../../../dialogs/speciality-image-add-dialog/speciality-image-add-dialog.component';
import { SpecialityImageListDialogComponent } from '../../../../dialogs/speciality-image-list-dialog/speciality-image-list-dialog.component';
import { SpecialityCategoryModel } from '../../../../contracts/models/speciality-category-model';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrl: './speciality-list.component.css'
})
export class SpecialityListComponent implements OnInit {

  constructor(
    private specialityService: SpecialityService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  specialties: SpecialityModel[];
  specialityWithCardImage: SpecialityWithCardImageModel[];
  specialityCategories: SpecialityCategoryModel[];
  categoryId: string = null;

  addSpecialityImage(id: string, title: string): void {
    const dialogRef = this.dialog.open(SpecialityImageAddDialogComponent, {
      data: { id: id, title: title }
    });
  }

  uploadSpecialityImages(id: string, title: string) {
    const dialogRef = this.dialog.open(SpecialityImageListDialogComponent, {
      data: { id: id, title: title }
    });
  }

  getSpecialties() {
    this.spinnerService.show();

    this.specialityService.getSpecialties().subscribe({
      next: (data: SpecialityModel[]) => {
        this.specialties = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  getSpecialtiesWithCardImage() {
    this.spinnerService.show();

    this.specialityService.getSpecialtiesWithCardImage().subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialityWithCardImage = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  getSpecialtiesByCategoryIdWithCardImage(categoryId: string) {
    this.spinnerService.show();

    this.specialityService.getSpecialtiesByCategoryIdWithCardImage(categoryId).subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialityWithCardImage = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  getSpecialtiesByCategory(categoryId: string) {
    if (categoryId)
      this.getSpecialtiesByCategoryIdWithCardImage(categoryId);
    else
      this.getSpecialtiesWithCardImage();
  }

  deleteSpeciality(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.specialityService.deleteSpeciality(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();
            this.alertifyService.message("Silme işlemi başarı ile gerçekleşmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getSpecialtiesWithCardImage();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status != 401) {
              this.spinnerService.hide();
              this.alertifyService.message(error.error, {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
            }
          }
        });
      }

    });

  }

  getSpecialityCategories() {
    this.spinnerService.show();

    this.specialityService.getSpecialityCategories().subscribe({
      next: (data: SpecialityCategoryModel[]) => {
        this.specialityCategories = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  ngOnInit(): void {
    this.getSpecialtiesWithCardImage();
    this.getSpecialityCategories();
  }

}
