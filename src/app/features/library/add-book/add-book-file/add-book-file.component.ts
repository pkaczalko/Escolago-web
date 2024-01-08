import { Component, OnInit } from '@angular/core';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { NgIf } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-book-file',
  standalone: true,
  imports: [FileUploadModule, NgIf],
  templateUrl: './add-book-file.component.html',
  styleUrl: './add-book-file.component.css',
})
export class AddBookFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  uploadUrl: string = '';
  fileUrl: string = '';

  constructor(
    private conf: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.uploadUrl =
      'http://localhost:8080/asset/' + this.conf.data.toString() + '/upload';
  }

  onUpload(event: any) {
    if (event.originalEvent.body.url) {
      setTimeout(() => {
        this.fileUrl = event.originalEvent.body.url;
      }, 100);
    }
  }

  save() {
    this.ref.close(this.fileUrl);
  }
}
