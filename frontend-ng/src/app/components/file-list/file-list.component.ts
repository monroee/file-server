import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../../service/api.service";
import { saveAs } from "file-saver";

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

  constructor(private apiService: ApiService) {
    this.readFiles();
    this.filterFiles();
  }

  ngOnInit() { }

  filterFiles() {

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

  downloadFile(full_path: string, name: string) {
    this.apiService.downloadFile(full_path)
      .subscribe(
        data => {
          saveAs(data, name);
        },
        err => console.error(err));
  }

  private getImageUrl(file) {
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

}
