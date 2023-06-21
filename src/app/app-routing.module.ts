import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/bootstrap', pathMatch: 'full'},
  {
    path: 'bootstrap',
    loadChildren: () => import('./bootstrap-view/bootstrap-view.module')
      .then(m => m.BootstrapViewModule)
  },
  {
    path: 'vanilla',
    loadChildren: () => import('./vanilla-view/vanilla-view.module')
      .then(m => m.VanillaViewModule)
  },
  {
    path: 'tailwind',
    loadChildren: () => import('./tailwind-view/tailwind-view.module').then(m => m.TailwindViewModule)
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
