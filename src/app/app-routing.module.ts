import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment as env } from './../environments/environment';
import { redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/login']);
const toHome = () => redirectLoggedInTo(['/home']);

// A constante 'routes' contém as rotas para todas as páginas ativas do aplicativo.
const routes: Routes = [

  // Rota padrão aponta para 'home'.
  // A rota '' deve ser sempre a primeira rota desta lista.
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Experimental → Será apagado!!!
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },

  // Página inicial.
  {
    path: 'home',
    title: `${env.appName} - Início`,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  // Página 'sobre'.
  {
    path: 'about',
    title: `${env.appName} - Sobre`,
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },

  // Página com formulário de contatos.
  {
    path: 'contacts',
    title: `${env.appName} - Faça contato`,
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },

  // Página de erro 404, exibida quando a rota não existe.
  {
    path: '404',
    title: `${env.appName} - Erro 404`,
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },

  // Login de usuário.
  // Somente usuário não logado pode fazer isso.
  {
    path: 'login',
    title: `${env.appName} - Entrar`,
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),

    // Se usuário já está logado, carrega a 'home'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toHome }
  },

  // Perfil do usuário logado.
  // Somente usuário logado pode fazer isso.
  {
    path: 'profile',
    title: `${env.appName} - Perfil`,
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),

    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },

  // Políticas e privacidade.
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

  // Exibe um item cadastrado.
  // Somente usuário logado pode fazer isso.
  {
    path: 'view/:id',
    title: `${env.appName} - Exibe um Treco`,
    loadChildren: () => import('./things/view/view.module').then(m => m.ViewPageModule),

    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
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

  // Experimental → Será apagado!!!
  {
    path: 'camera',
    title: `${env.appName} - Tirar Foto`,
    loadChildren: () => import('./temp/camera/camera.module').then(m => m.CameraPageModule)
  },

  // Experimental → Será apagado!!!
  {
    path: 'listall',
    title: `${env.appName} - Lista Imagens`,
    loadChildren: () => import('./temp/listall/listall.module').then(m => m.ListallPageModule)
  },

  // Cdastra um novo item.
  // Somente usuário logado pode fazer isso.
  {
    path: 'new',
    title: `${env.appName} - Novo Treco`,
    loadChildren: () => import('./things/new/new.module').then(m => m.NewPageModule),

    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },

  // Edita um item.
  // Somente usuário logado pode fazer isso.
  {
    path: 'edit/:id',
    loadChildren: () => import('./things/edit/edit.module').then(m => m.EditPageModule),

    // Se usuário não está logado, carrega 'login'.
    canActivate: [AuthGuard],
    data: { authGuardPipe: toLogin }
  },

  // Experimental → Será apagado!!!
  {
    path: 'form',
    loadChildren: () => import('./temp/form/form.module').then( m => m.FormPageModule)
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
