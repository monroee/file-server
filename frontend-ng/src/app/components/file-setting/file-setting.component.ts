import { Component, OnInit } from '@angular/core';
import { ApiService } from "./../../service/api.service";

@Component({
  selector: 'app-file-setting',
  templateUrl: './file-setting.component.html',
  styleUrls: ['./file-setting.component.css']
})
export class FileSettingComponent implements OnInit {

  Settings:any = [];

  constructor(private apiService: ApiService) {
    this.readSettings();
   }

  ngOnInit() { }

  readSettings(){
    this.apiService.getSettings().subscribe((data) => {
      this.Settings = data; 
    })
  }
}
