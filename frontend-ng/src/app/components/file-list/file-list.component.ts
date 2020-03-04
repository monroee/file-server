import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from "../../service/api/api.service";
import { saveAs } from "file-saver";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  Files: any = [];
  DownloadImageUrl: string = "assets/img/download_icon.png";
  PlayImageUrl: string = "assets/img/play_icon.png";
  searchText: any = '';
  FilteredFiles = [...this.Files];
  ActiveFile: string;
  BlobUrl: any;

  constructor(private apiService: ApiService, public matDialog: MatDialog, public dom: DomSanitizer) {
    this.readFiles();
    this.filterFiles();
  }

  ngOnInit() { }

  private filterFiles() {

    if (!this.Files.length) {
      this.FilteredFiles = [];
      return;
    }

    if (!this.searchText) {
      this.FilteredFiles = [...this.Files];
      return;
    }

    const files = [...this.Files];
    const fileProperty = Object.keys(files[0]);
    this.FilteredFiles = files.filter((file) => {
      return fileProperty.find((prop) => {
        const valString = file[prop].toString().toLowerCase();
        return valString.includes(this.searchText.toLowerCase());
      })
        ? file
        : null;
    })
  }

  private readFiles() {
    this.apiService.getFiles().subscribe((data) => {
      this.Files = data;
      this.Files.forEach(file => {
        file.image_url = this.getImageUrl(file);
        this.FilteredFiles = this.Files;
      });
    });
  }

  downloadFile(file: any) {
    this.apiService.downloadFile(file.full_path)
      .subscribe(
        data => {
          saveAs(data, file.name);
        },
        err => console.error(err));
  }

  playMedia(file: any) {
    switch (file.type) {
      case "audio/mpeg":
      case "video/mp4":

        this.apiService.playMedia(file.full_path)
          .subscribe(data => {
            let bloblURL = URL.createObjectURL(data);
            this.BlobUrl = bloblURL;
            this.ActiveFile = file.name;
            this.openMediaModal(file);
          },
            err => console.error(err));

        break;
      default:
        break;
    }


  }

  private getImageUrl(file: { type: any; name: string; }) {
    switch (file.type) {
      case "folder":
        return "assets/img/folder_icon.png";
        break;
      case "audio/mpeg":
        return "assets/img/music_icon.png";
        break;
      case "video/mp4":
        return "assets/img/video_icon.png";
        break;
      case "document":
        return "assets/img/docs_icon.png";
        break;
      case "text/plain":
        if (file.name.includes('.ini')) {
          return "assets/img/settings_icon.png";
        }
        else {
          return "assets/img/docs_icon.png";
        }
        break;
      default:
        return "assets/img/noimage_icon.png";
    }
  }

  private openMediaModal(file: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";

    let modalSize = this.getModalSize(file.type);

    dialogConfig.height = modalSize.height;
    dialogConfig.width = modalSize.width;
    dialogConfig.data = {
      name: "MediaModal",
      fileType: file.type,
      title: this.ActiveFile,
      url: this.dom.bypassSecurityTrustUrl(this.BlobUrl)
    };
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  private getModalSize(fileType: string) {
    switch(fileType){
      case "audio/mpeg":
        return { height: "30%", width: "90%"  }
        break;
      case "video/mp4":
        return { height: "60%", width: "90%"  }
        break;
      default:
        return { height: "50%", width: "50%"  };
        break;
    }
  }

}
