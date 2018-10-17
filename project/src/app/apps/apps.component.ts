import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-config',
  template: `
    <div mat-dialog-title>Confirmação</div>
    <label mat-label>Realmente quer excluir {{ data.type }}: <strong>{{ data.title }}</strong>?</label>
    <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
      <button mat-raised-button color="primary" (click)="closeConfirm(false)">Não</button>
      <button mat-raised-button color="warn" (click)="closeConfirm(true)">Sim</button>
    </div>
  `,
  styles: []
})

export class DialogConfirmComponent {
  constructor(private dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  public closeConfirm(value: boolean): void {
    this.dialogRef.close(value);
  }
}
