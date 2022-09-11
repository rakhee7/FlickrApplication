import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImageSearchComponent } from './image-search/image-search.component';


const routes: Routes = [
  {
    path: "search",
    component: ImageSearchComponent
  },
  {
    path: "imagedetails/:id",
    component: ImageDetailsComponent,
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: "/search",
    pathMatch: "full"
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
