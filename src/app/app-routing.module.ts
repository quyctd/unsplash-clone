import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { JoinComponent } from './main/join/join.component';
import { HomeComponent } from './main/home/home.component';
import { UploadComponent } from './main/upload/upload.component';
import { PhotoViewerComponent } from './main/photo-viewer/photo-viewer.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'photos/id', component: PhotoViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
