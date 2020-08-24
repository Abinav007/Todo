import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTaskComponent } from './my-task/my-task.component';
import { OfficeTaskComponent } from './office-task/office-task.component';


const routes: Routes = [{
  path:'myTask',
  component: MyTaskComponent
},
{
  path:'officeTask',
  component:MyTaskComponent
}
,{
  path: '', redirectTo:'/myTask',pathMatch: 'prefix'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }