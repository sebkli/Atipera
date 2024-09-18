import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MaterialModule } from './material/material.module';
import { APIService } from './services/api.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTableComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [APIService, HttpClient],
})
export class AppComponent {}
