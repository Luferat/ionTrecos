import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment as env } from './../environments/environment';
import { redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/login']);
const toHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    title: `${env.appName} - Início`,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'about',
    title: `${env.appName} - Sobre`,
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contacts',
    title: `${env.appName} - Faça contato`,
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: '404',
    title: `${env.appName} - Erro 404`,
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'login',
    title: `${env.appName} - Entrar`,
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),

    // Se usuário já está logado, carrega a 'home'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },
  {
    path: 'profile',
    title: `${env.appName} - Perfil`,
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),

    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'policies',
    title: `${env.appName} - Sua privacidade`,
    loadChildren: () => import('./pages/policies/policies.module').then(m => m.PoliciesPageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'fblist',
    loadChildren: () => import('./temp/fblist/fblist.module').then(m => m.FblistPageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'fbview/:id',
    loadChildren: () => import('./temp/fbview/fbview.module').then(m => m.FbviewPageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'fbpopulate',
    loadChildren: () => import('./temp/fbpopulate/fbpopulate.module').then(m => m.FbpopulatePageModule)
  },
  {
    path: 'view/:id',
    title: `${env.appName} - Exibe um Treco`,
    loadChildren: () => import('./things/view/view.module').then(m => m.ViewPageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'store',
    loadChildren: () => import('./temp/store/store.module').then(m => m.StorePageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'gps',
    loadChildren: () => import('./temp/gps/gps.module').then(m => m.GpsPageModule)
  },
  {
    path: 'camera',
    title: `${env.appName} - Tirar Foto`,
    loadChildren: () => import('./temp/camera/camera.module').then(m => m.CameraPageModule)
  },
  {
    path: 'listall',
    title: `${env.appName} - Lista Imagens`,
    loadChildren: () => import('./temp/listall/listall.module').then(m => m.ListallPageModule)
  },
  {
    path: 'new',
    title: `${env.appName} - Novo Treco`,
    loadChildren: () => import('./things/new/new.module').then(m => m.NewPageModule),
    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },

  // Rota inexistente redireciona para '404'.
  // '**' deve ser SEMPRE a última rota desta lista.
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
