import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/api/api.service";

@Component({
  selector: 'app-file-about',
  templateUrl: './file-about.component.html',
  styleUrls: ['./file-about.component.css']
})
export class FileAboutComponent implements OnInit {

  About:any = [];

  constructor(private apiService: ApiService) {
    this.readAbout();
   }

  ngOnInit() {}

  readAbout(){
    this.apiService.getAbout().subscribe((data) => {
      this.About = data;
    })
  }
}
