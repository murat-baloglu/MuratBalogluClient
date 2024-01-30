import { Component, Input } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    public dialog: MatDialog) { }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;

    const fileData: FormData = new FormData();

    for (const file of files) {

      if (this.options.optionalFileName) {
        const extension = file.relativePath.split('.').pop();
        file.relativePath = `${this.options.optionalFileName}.${extension}`;
      }

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

    }

    const dialogRef = this.dialog.open(FileUploadDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe({

          next: (data: any) => {
            this.alertifyService.message("Yükleme işlemi basari ile gerçekleşmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
          },
          error: (error: HttpErrorResponse) => {
            this.alertifyService.message("Yükleme işlemi sırasında beklenmeyen bir hata oluştu.", {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            });
          }

        });
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  multiple: boolean = true;
  optionalFileName?: string; //relativePath yani orjinal file name i değiştirmek istiyorsan buraya atama yap. File name format işlemleri backend de yapılmaktadır.
}
