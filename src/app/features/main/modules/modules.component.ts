import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../../core/services/modules/modules.service';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ModulesDTO } from '../../../core/interfaces/modules';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [TableModule, RouterLink],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css',
})
export class ModulesComponent implements OnInit {
  modules!: ModulesDTO[];
  constructor(private modulesService: ModulesService) {}

  ngOnInit() {
    this.modulesService.getModules().subscribe((data: ModulesDTO[]) => {
      this.modules = data;
    });
  }
}
