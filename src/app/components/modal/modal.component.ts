import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<{ value: string }>(MAT_DIALOG_DATA);
  readonly value = model(this.data.value);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
