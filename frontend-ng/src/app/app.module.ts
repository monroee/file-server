import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileSettingComponent } from './components/file-setting/file-setting.component';
import { FileAboutComponent } from './components/file-about/file-about.component';

import { ApiService } from "./service/api.service";

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    FileSettingComponent,
    FileAboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
