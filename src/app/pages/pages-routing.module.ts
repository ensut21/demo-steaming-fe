import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveStreamingComponent } from './live-streaming/live-streaming.component';

const routes: Routes = [
  { path: 'demo-streaming', component: LiveStreamingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
