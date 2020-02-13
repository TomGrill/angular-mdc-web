import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Api, Examples, Sass, TextField} from './text-field';

export const ROUTE_DECLARATIONS = [
  Api,
  Examples,
  Sass,
  TextField
];

const ROUTES: Routes = [
  {
    path: '', component: TextField,
    children: [
      {path: '', redirectTo: 'api'},
      {path: 'api', component: Api},
      {path: 'sass', component: Sass},
      {path: 'examples', component: Examples}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule {}
