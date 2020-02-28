import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../../service/api.service";
import { saveAs } from "file-saver";
import { $, Button } from 'protractor';

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

  playMedia(full_path: string, name: string, type: string) {
    switch (type) {
      case "audio/mpeg":
      case "video/mp4":

        this.apiService.playMedia(full_path)
          .subscribe(data => {
            let bloblURL = URL.createObjectURL(data);

            this.ActiveFile = name;
            let media_model_body = document.getElementById("modal_body");
            media_model_body.innerHTML = "";
            switch (type) {
              case "audio/mpeg":
                let audio_obj = document.createElement('audio');
                audio_obj.setAttribute("src", bloblURL);
                audio_obj.id = "audio_player";
                audio_obj.setAttribute("style", "width: -webkit-fill-available");
                audio_obj.setAttribute("controls", "controls");
                audio_obj.autoplay = true;

                media_model_body.appendChild(audio_obj);
                break;
              case "video/mp4":
                let video_obj = document.createElement('video');
                video_obj.setAttribute("src", bloblURL);
                video_obj.id = "video_player";
                video_obj.setAttribute("style", "height: 174px");
                video_obj.setAttribute("controls", "controls");
                video_obj.autoplay = true;

                media_model_body.appendChild(video_obj);
                break;
            }

            let modal_button = document.getElementById("modal_button");
            modal_button.click();
          },
            err => console.error(err));

        break;
      default:
        break;
    }


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
