import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './screens/purchase/purchase.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent },
  { path: 'item/:id', component: PurchaseComponent },
  { path: 'delete/:id', component: PurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
