import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

 isAdmin: any;
 name: any;
 spinnerVisible = false;


 constructor(
   private authService: AuthServiceService  
 ) {

 }
  ngOnInit(): void {
    this.spinnerVisible = true;
    this.authService.getUserInfo().subscribe(res => {
      this.name = `${res.data.name} ${res.data.lastName}`;
      this.isAdmin = res.data.roles.includes('admin');
      this.spinnerVisible = false;
    })
  }
 
}
