import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalService } from "../../service/modal/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
    private modalService: ModalService
  ) { }

  ngOnInit() { }

  // actionFunction() {
  //   this.modalService.modalAction(this.modalData);
  //   this.closeModal();
  // }

  // closeModal() {
  //   this.dialogRef.close();
  // }
}
