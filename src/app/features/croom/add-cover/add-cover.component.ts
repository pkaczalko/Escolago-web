import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-cover',
  standalone: true,
  imports: [FileUploadModule, NgIf],
  templateUrl: './add-cover.component.html',
  styleUrl: './add-cover.component.css',
})
export class AddCoverComponent implements OnInit {
  uploadUrl!: string;
  icon: string = 'pi pi-plus';
  buttonLabel: string = '';
  link: string = '';
  fileAdded: boolean = false;
  id!: number;

  constructor(
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit() {
    this.id = this.config.data;
    this.uploadUrl =
      'http://localhost:8080/asset/' + this.id.toString() + '/upload';
  }

  onBasicUploadAuto(event: any) {
    if (event.originalEvent.body.url) {
      this.link = event.originalEvent.body.url;
      this.messageService.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Pomyślnie dodano plik',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Coś poszło nie tak',
      });
    }
    this.icon = 'pi pi-plus';
  }

  selected() {
    this.icon = 'pi pi-spin pi-spinner';
  }

  save() {
    this.ref.close(this.link);
  }
}







