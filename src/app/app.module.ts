import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomStyleModule } from './shared/modules/custom-style/custom-style.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MatButtonToggleModule, MatGridListModule,
  MatMenuModule,
  MatNativeDateModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { HomepageComponent } from './homepage/homepage.component';
import { DateFliterPipe } from './shared/fliters/date-fliter.pipe';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { FileManageComponent } from './file-manage/file-manage.component';
import { SubmissionOverviewComponent } from './submission-overview/submission-overview.component';
import { GradesComponent } from './grades/grades.component';
import { GradeAssignmentComponent } from './grade-assignment/grade-assignment.component';
import {IgxCalendarModule, IgxGridModule} from 'igniteui-angular';
import { AssignmentManagementComponent } from './assignment-management/assignment-management.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { PublicFileDownloadComponent } from './public-file-download/public-file-download.component';
import { BoardOverviewComponent } from './board-overview/board-overview.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmAssignmentDialogComponent } from './confirm-assignment-dialog/confirm-assignment-dialog.component';
import { BoardCreateDialogComponent } from './board-create-dialog/board-create-dialog.component';
import { ReplyDialogComponent } from './reply-dialog/reply-dialog.component';
import { PeopleComponent } from './people/people.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HeaderComponent } from './header/header.component';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { NotificationComponent } from './notification/notification.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    DateFliterPipe,
    AssignmentDetailComponent,
    FileManageComponent,
    SubmissionOverviewComponent,
    GradesComponent,
    GradeAssignmentComponent,
    AssignmentManagementComponent,
    AssignmentEditComponent,
    PublicFileDownloadComponent,
    BoardOverviewComponent,
    BoardDetailComponent,
    ConfirmDialogComponent,
    ConfirmAssignmentDialogComponent,
    BoardCreateDialogComponent,
    ReplyDialogComponent,
    PeopleComponent,
    EditProfileComponent,
    HeaderComponent,
    DrawerContainerComponent,
    NotificationComponent,
    PeopleDetailComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent
  ],
  imports: [
    MatButtonToggleModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    CustomStyleModule,
    HttpClientModule,
    IgxGridModule,
    IgxCalendarModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
