import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ElementInterface } from '../../interfaces/element';
import { MaterialModule } from '../../material/material.module';
import { APIService } from '../../services/api.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [ModalComponent, MaterialModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnInit {
  columns = [
    {
      columnDef: 'position',
      header: 'Number',
      cell: (element: ElementInterface) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: ElementInterface) => `${element.name}`,
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: ElementInterface) => `${element.weight}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
      cell: (element: ElementInterface) => `${element.symbol}`,
    },
  ];
  dataSource = new MatTableDataSource<ElementInterface>();
  displayedColumns = this.columns.map((c) => c.columnDef);
  filter$ = new BehaviorSubject<string>('');
  dialog = inject(MatDialog);

  constructor(private APIService: APIService) {}

  ngOnInit(): void {
    this.getData();
    this.setupFilter();
  }

  private getData(): void {
    this.APIService.fetchData().subscribe({
      next: (data: ElementInterface[]) => {
        this.dataSource.data = data;
      },
      error: (error: Error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue);
  }

  private setupFilter() {
    this.filter$
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((filterValue) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });
  }

  openDialog(cell: string, row: ElementInterface, columnName: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { value: cell },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.updateTable(row, columnName, result);
      }
    });
  }

  private updateTable(
    row: ElementInterface,
    columnName: string,
    value: string
  ): void {
    const originalRowIndex = this.dataSource.data.findIndex(
      (item) => item === row
    );

    if (originalRowIndex !== -1) {
      const updatedData = [...this.dataSource.data];
      updatedData[originalRowIndex] = {
        ...updatedData[originalRowIndex],
        [columnName]: value,
      };
      this.dataSource.data = updatedData;
    }
  }
}
