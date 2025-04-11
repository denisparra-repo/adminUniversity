import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    name = '';

    roles = '';

    userId = null;

    pendingNotifications: any[] = [];

    intervalId: any;

    constructor(
        private toggleService: ToggleService,
        private authService: AuthServiceService,
        public themeService: CustomizerSettingsService,
        private toastService: ToastrService
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.authService.listener.asObservable().subscribe(_ => {
            this.authService.getUserInfo().subscribe(res => {
                this.userId = res.data.id;
                this.name = `${res.data.name} ${res.data.lastName}`;
                this.roles = res.data.roles;
            })
        })
        this.authService.getUserInfo().subscribe(res => {
            this.userId = res.data.id;
            this.name = `${res.data.name} ${res.data.lastName}`;
            this.roles = res.data.roles;

        })
        if (typeof localStorage !== 'undefined' 
            && localStorage.getItem('token') !== 'undefined'
            && this.name === ''
            && this.roles === '') {
                this.authService.getUserInfo().subscribe(res => {
                    this.userId = res.data.id;
                    this.name = `${res.data.name} ${res.data.lastName}`;
                    this.roles = res.data.roles;
                })
        }
    }



    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

}