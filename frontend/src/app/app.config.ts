import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthServiceService } from './services/auth-service.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpIntercetorRequest } from './services/http-interceptor-request.interceptor';
import { provideToastr } from 'ngx-toastr';
import { GradeService } from './services/grade.service';
import { SubjectService } from './services/subject.service';
import { CourseService } from './services/course.service';


export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes), 
        provideClientHydration(), 
        provideAnimationsAsync(),
        AuthServiceService,
        GradeService,
        SubjectService,
        CourseService,
        provideHttpClient(withInterceptorsFromDi()),
        {provide: HTTP_INTERCEPTORS, useClass: HttpIntercetorRequest, multi: true},
        provideAnimations(),
        provideToastr()
    ]
};