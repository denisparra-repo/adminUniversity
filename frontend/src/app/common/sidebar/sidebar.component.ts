import { Component, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { sidebarMenu } from './sidebar.constants';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [NgScrollbarModule, MatExpansionModule, RouterLinkActive, RouterModule, RouterLink, NgClass],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements  OnInit {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    sidebarMenuList: any[] = [];

    constructor(
        private toggleService: ToggleService,
        private authService: AuthServiceService,
        public themeService: CustomizerSettingsService
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
          this.setSidebarMenuList();
        })

        if (typeof localStorage !== 'undefined' && this.sidebarMenuList.length === 0) {
            this.setSidebarMenuList();
        }
        
    }

    setSidebarMenuList() {
        const roles = this.authService.getCurrentRoles();
        this.sidebarMenuList = roles.map((role:any) => sidebarMenu[role]).filter((element: any, index: number, array: any[]) => array.findIndex(e => e.id === element.id) === index).flat();
    }


    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

}