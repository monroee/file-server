import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Monroe File Server';

  constructor() { }

  // openLogoutModal(){
  //   const userId = "2606";
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "300px";
  //   dialogConfig.width = "400px";
  //   dialogConfig.data = {
  //     name: "logout",
  //     title: "Are you sure you want to logout?",
  //     description: "Adam Monroe does not want you to log out. huhuhu.. :(",
  //     actionButtonText: "Logout",
  //     userId: userId
  //   };

  //   const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  // }

  // openDeleteProductModal(){
  //   const productId = "2606";
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "300px";
  //   dialogConfig.width = "400px";
  //   dialogConfig.data = {
  //     name: "deleteProduct",
  //     title: "Are you sure you want to delete this product?",
  //     description: `If you continue, the product with ID ${productId} will be deleted`,
  //     actionButtonText: "Delete",
  //     productId: productId
  //   };

  //   const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  // }
}
