import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../../service/api.service";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  Files: any = [];
  Images: any =
    [
      {
        "type": "Folder",
        "url": "assets/img/folder_icon.png"
      },
      {
        "type": "audio/mpeg",
        "url": "assets/img/music_icon.png"
      },
      {
        "type": "video",
        "url": "assets/img/video_icon.png"
      },
      {
        "type": "document",
        "url": "assets/img/document_icon.png"
      }
    ];
  DownloadImageUrl: string = "assets/img/download_icon.png";

  constructor(private apiService: ApiService) {
    this.readFiles();
  }

  ngOnInit() { }

  readFiles() {
    this.apiService.getFiles().subscribe((data) => {
      this.Files = data;
      this.Files.forEach(file => {
        switch (file.type) {
          case "Folder":
            file.image_url = "assets/img/folder_icon.png";
            break;
          case "audio/mpeg":
            file.image_url = "assets/img/music_icon.png";
            break;
          case "video/mp4":
            file.image_url = "assets/img/video_icon.png";
            break;
          case "document":
            file.image_url = "assets/img/docs_icon.png";
            break;
        }
      });
    });
  }

}
