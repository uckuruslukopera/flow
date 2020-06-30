import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'home',
  loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
  // {
  //   path: '404',
  //   component: PageNotFoundComponent
  // },
  // {
  //   path: '**', component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
