import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AssignmentDetailComponent} from './assignment-detail/assignment-detail.component';
import {SubmissionOverviewComponent} from './submission-overview/submission-overview.component';
import {GradesComponent} from './grades/grades.component';
import {GradeAssignmentComponent} from './grade-assignment/grade-assignment.component';
import {AssignmentManagementComponent} from './assignment-management/assignment-management.component';
import {AssignmentEditComponent} from './assignment-edit/assignment-edit.component';
import {FileManageComponent} from './file-manage/file-manage.component';
import {PublicFileDownloadComponent} from './public-file-download/public-file-download.component';
import {BoardOverviewComponent} from './board-overview/board-overview.component';
import {BoardDetailComponent} from './board-detail/board-detail.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ConfirmAssignmentDialogComponent} from './confirm-assignment-dialog/confirm-assignment-dialog.component';
import {BoardCreateDialogComponent} from './board-create-dialog/board-create-dialog.component';
import {ReplyDialogComponent} from './reply-dialog/reply-dialog.component';
import {PeopleComponent} from './people/people.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SecureGuard} from './secure.guard';
import {NotificationComponent} from './notification/notification.component';
import {PeopleDetailComponent} from './people-detail/people-detail.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ResetPasswordRequestComponent} from './reset-password-request/reset-password-request.component';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset/:name',
    component: ResetPasswordComponent
  },
  {
    path: 'edit-assignment/:id',
    component: AssignmentEditComponent
  },
  {
    path: 'confirmBoardDelete',
    component: ConfirmDialogComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'reply',
    component: ReplyDialogComponent
  },
  {
    path: 'confirmAssignmentDelete',
    component: ConfirmAssignmentDialogComponent
  },

  {
    path: 'boardCreate',
    component: BoardCreateDialogComponent
  },
  {
    path: 'resetRequest',
    component: ResetPasswordRequestComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'board-detail/:id',
    component: BoardDetailComponent
  },

  {
    path: 'grade/:id',
    component: GradeAssignmentComponent
  },
  {
    path: 'home',
  canActivate: [SecureGuard],
    children: [
      {
        path: '',
        component: HomepageComponent

      },

      {
        path: 'notification',
        component: NotificationComponent

      },
      {
        path: 'assignment-detail/:id',
        component:AssignmentDetailComponent

      },
      {
        path: 'people-detail/:id',
        component:PeopleDetailComponent

      },
      {
        path: 'assignments',
        component: SubmissionOverviewComponent

      },  {
        path: 'people',
        component: PeopleComponent
      }
      ,
      {
        path: 'grades',
        component: GradesComponent
      }
      ,
      {
        path: 'assignment-manage',
        component: AssignmentManagementComponent
      },
      {
        path: 'file-manage',
        component: FileManageComponent
      }
      ,
      {
        path: 'file-download',
        component: PublicFileDownloadComponent
      }
      ,
      {
        path: 'board-overview',
        component: BoardOverviewComponent
      }
    ]

  },
  {
    path: '**',
    component: LoginComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
