import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileListComponent } from './components/file-list/file-list.component';
import { FileSettingComponent } from './components/file-setting/file-setting.component';
import { FileAboutComponent } from './components/file-about/file-about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'file-list' },
  { path: 'file-list', component: FileListComponent },
  { path: 'file-setting', component: FileSettingComponent },
  { path: 'file-about', component: FileAboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
