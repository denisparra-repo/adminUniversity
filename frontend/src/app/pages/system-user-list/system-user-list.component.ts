import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { HTTP_PAGEABLE_RESPONSE, UserResponse } from '../../models/htttp-response';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataRolesPipe } from '../../pipes/data-roles.pipe';

@Component({
  selector: 'app-system-user-list',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressSpinnerModule, DataRolesPipe],
  templateUrl: './system-user-list.component.html',
  styleUrl: './system-user-list.component.scss'
})
export class SystemUserListComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'LastName', 'Email', 'Roles', 'Actions'];
    
    users: Array<UserResponse> = [];
    dataSource = new MatTableDataSource<UserResponse>(this.users);
    size = 20;
    totalItems = 0;
    currentIndex = 0;
    spinnerVisible = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    /* ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
 */
    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        private authService: AuthServiceService,
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        public toastr: ToastrService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
      this.spinnerVisible = true;
      this.authService.getUserByPage(0, this.size).subscribe((res: HTTP_PAGEABLE_RESPONSE<UserResponse>) => {
         this.users = res.data.content;
         this.dataSource = new MatTableDataSource<UserResponse>(this.users);
         this.currentIndex = res.data.pageable.pageNumber;
         this.totalItems = res.data.totalElements;
         this.spinnerVisible = false;
      })
    }

    // isToggled
    isToggled = false;

    eventPage(e: any) {
      this.spinnerVisible = true;
      this.authService.getUserByPage(e.pageIndex, this.size).subscribe((res: HTTP_PAGEABLE_RESPONSE<UserResponse>) => {
        this.users = res.data.content;
        this.dataSource = new MatTableDataSource<UserResponse>(this.users);
        this.currentIndex = res.data.pageable.pageNumber;
        this.totalItems = res.data.totalElements;
        this.spinnerVisible = false;
     })
    }
    
    openDialog(emailUser: string): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          data: {email: emailUser},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.spinnerVisible = true;
            this.authService.deleteUserByEmail(result).subscribe(res => {
              this.toastr.success(res.message);
              this.authService.getUserByPage(this.currentIndex, this.size).subscribe((res: HTTP_PAGEABLE_RESPONSE<UserResponse>) => {
                this.users = res.data.content;
                this.dataSource = new MatTableDataSource<UserResponse>(this.users);
                this.currentIndex = res.data.pageable.pageNumber;
                this.totalItems = res.data.totalElements;
                this.spinnerVisible = false;
             })
            })
          }
      });
    }
}

// Dialog Overview Example Dialog
@Component({
  selector: 'delete-user-confirmation-dialog',
  templateUrl: 'delete-user-confirmation-dialog.html',
  standalone: true,
  imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
  ]
})
export class DialogOverviewExampleDialog {

  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

}
