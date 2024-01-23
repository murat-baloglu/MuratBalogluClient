import { Component, Input } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService) { }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;

    const fileData: FormData = new FormData();

    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

    }
    //console.log(fileData); console.log(files)
    //Send to server
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
        this.alertifyService.message("Yükleme işlemi sırasında beklenmeyen bir hata ile karşılaşılmıştır.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
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
  multiple?: boolean = true;
  // isClickedModalSaveButton?: boolean = false;
}
