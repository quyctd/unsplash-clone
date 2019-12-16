import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { JoinComponent } from './main/join/join.component';
import { HomeComponent } from './main/home/home.component';
import { UploadComponent } from './main/upload/upload.component';
import { PhotoViewerComponent } from './main/photo-viewer/photo-viewer.component';
import { UserComponent } from './main/user/user.component';
import { SearchComponent } from './main/search/search.component';
import { FollowingComponent } from './main/home/following/following.component';
import { CollectionsComponent } from './main/collections/collections.component';
import { CltViewComponent } from './main/collections/clt-view/clt-view.component';
import { LogoutComponent } from './main/logout/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'photos/:id', component: PhotoViewerComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/likes', component: UserComponent },
  { path: 'user/:id/collections', component: UserComponent },
  { path: 's/photos/query', component: SearchComponent },
  { path: 's/collections/query', component: SearchComponent },
  { path: 's/users/query', component: SearchComponent },
  { path: 'following', component: FollowingComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/id', component: CltViewComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
