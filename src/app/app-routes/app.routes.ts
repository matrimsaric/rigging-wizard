import { Routes, RouterModule } from '@angular/router';

// our module routes
import { SourceComponent } from '../modules/admin/source/source.component';
import { SelectionComponent } from '../modules/rigging/selection/selection.component';



const appRoutes: Routes = [
    { path: 'home', component: SourceComponent },
    { path: 'single', component: SelectionComponent },
    { path: '**', component: SourceComponent }// will show when routing fails
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes);

