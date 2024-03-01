import { Component, OnInit } from '@angular/core';
import { PatientCommentService } from '../../../../services/common/models/patient-comment.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PatientCommentModel } from '../../../../contracts/models/patient-comment-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-patient-comment-list',
  templateUrl: './patient-comment-list.component.html',
  styleUrl: './patient-comment-list.component.css'
})
export class PatientCommentListComponent implements OnInit {

  constructor(
    private patientCommentService: PatientCommentService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  patientComments: PatientCommentModel[];

  getPatientComments() {
    this.spinnerService.show();

    this.patientCommentService.getPatientComments().subscribe({
      next: (data: PatientCommentModel[]) => {
        this.patientComments = data;

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

  deletePatientComment(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.patientCommentService.deletePatientComment(id).subscribe({
          next: (data: any) => {
            this.alertifyService.message(data.message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getPatientComments();
          },
          error: (error: HttpErrorResponse) => {
            this.alertifyService.message(error.error, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            });
          }
        });
      }
    });

  }
    
  // updatePatientComment(patientCommentModel: PatientCommentModel) {
  //   this.patientCommentService.updatePatientComment(patientCommentModel).subscribe({
  //     next: (data: any) => {
  //       this.alertifyService.message("Başarı ile güncellenmiştir.", {
  //         dismissOthers: true,
  //         messageType: MessageType.Success,
  //         position: Position.TopRight
  //       });
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.alertifyService.message(error.message, {
  //         dismissOthers: true,
  //         messageType: MessageType.Error,
  //         position: Position.TopRight
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.getPatientComments();
  }

}
