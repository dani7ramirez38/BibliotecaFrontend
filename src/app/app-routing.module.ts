import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compartido/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
 
  { path: 'libros', 
    loadChildren: () => import('./libros/libros.module').then(m => m.LibrosModule)
  },
  { path: 'categoria', 
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
  },
  { path: 'prestamos', 
    loadChildren: () => import('./prestamos/prestamos.module').then(m => m.PrestamosModule)
  },
  { path: 'usuarios', 
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  { path: 'autor', 
    loadChildren: () => import('./autor/autor.module').then(m => m.AutorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
