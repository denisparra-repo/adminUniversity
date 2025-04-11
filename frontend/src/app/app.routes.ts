import { Routes } from '@angular/router';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainComponent } from './dashboard/main/main.component';

import { AuthGuard } from './auth.guard';
import { SystemUserListComponent } from './pages/system-user-list/system-user-list.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectCreateComponent } from './pages/subject-create/subject-create.component';
import { SubjectEditComponent } from './pages/subject-edit/subject-edit.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { AssignSubjectToCourseComponent } from './pages/assign-subject-to-course/assign-subject-to-course.component';
import { AssignSubjectToStudentComponent } from './pages/assign-subject-to-student/assign-subject-to-student.component';
import { GradeListComponent } from './pages/grade-list/grade-list.component';
import { GradeCreateComponent } from './pages/grade-create/grade-create.component';


export const routes: Routes = [
    {path: '', redirectTo:'/authentication', pathMatch: 'full'},
    {path: 'dashboard', component: MainComponent},
    {path: 'system-users', component: SystemUserListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'subject-list', component: SubjectListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'subject-create', component: SubjectCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'subject-edit', component: SubjectEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'course-list', component: CourseListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'course-create', component: CourseCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'course-edit', component: CourseEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'grade-list', component: GradeListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'grade-create', component: GradeCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'assign-subject-course', component: AssignSubjectToCourseComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {path: 'assign-subject-student', component: AssignSubjectToStudentComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'sign-up', component: SignUpComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
    
];