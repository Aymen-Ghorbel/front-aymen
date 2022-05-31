import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { AuthGuard } from './utility/app.guard';
import { BasicModelsComponent } from './demo/ui-elements/ui-basic/basic-models/basic-models.component';
import { BasicDetailsComponent } from './demo/ui-elements/ui-basic/basic-details/basic-details.component';
import { BasicElementsComponent } from './demo/pages/form-elements/basic-elements/basic-elements.component';
import { BasicModalComponent } from './demo/ui-elements/ui-basic/basic-modal/basic-modal.component';
import { BasicTypographyComponent } from './demo/ui-elements/ui-basic/basic-typography/basic-typography.component';
import { BasicAlertComponent } from './demo/ui-elements/ui-basic/basic-alert/basic-alert.component';
import { BasicGridComponent } from './demo/ui-elements/ui-basic/basic-grid/basic-grid.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)/*,canActivate: [AuthGuard]*/
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      // { path: 'basic/models/:idBrand', component: BasicModelsComponent }
      // { path: 'basic/cards/basic/modele/ModelsByBrand/:idBrand', component: BasicModelsComponent,canActivate: [AuthGuard] },
      { path: 'DetailsByModel/:idModel', component: BasicDetailsComponent/*,canActivate: [AuthGuard]*/ },
      { path: 'basic/cards/modelsByBrand/:idBrand/details/:idModel/credit/:idCredit', component: BasicElementsComponent/*,canActivate: [AuthGuard]*/ },
      { path: 'basic/cards/modelsByBrand/:idBrand/details/:idModel', component: BasicModalComponent/*,canActivate: [AuthGuard]*/ },
      { path: 'basic/cards/modelsByBrand/:idBrand', component: BasicTypographyComponent},
      { path: 'profile', component: BasicAlertComponent },
      { path: 'basic/cards/modelsByBrand/:idBrand/details/:idModel/forms/documents', component: BasicGridComponent/*,canActivate: [AuthGuard]*/ }

    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
