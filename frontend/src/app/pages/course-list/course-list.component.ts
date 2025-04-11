import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import {
  MatDialog
} from '@angular/material/dialog';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HTTP_PAGEABLE_RESPONSE } from '../../models/htttp-response';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteItemConfirmationComponent } from '../../common/delete-item-confirmation/delete-item-confirmation.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressSpinnerModule, DeleteItemConfirmationComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Actions'];
    
    courses: Array<any> = [];
    dataSource = new MatTableDataSource<any>(this.courses);
    size = 20;
    totalItems = 0;
    currentIndex = 0;
    spinnerVisible = false;
    deleteItems = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        private courseService: CourseService,
        private router: Router,
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        public toastr: ToastrService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
      this.getCoursesByPage(0);
    }

    // isToggled
    isToggled = false;

    eventPage(e: any) {
      this.getCoursesByPage(e.pageIndex);
    }
    

    editCourse(id: number) {
      this.router.navigate(['/course-editor', id]);
    }

    deleteCourse(id: any): void {
      const dialogRef = this.dialog.open(DeleteItemConfirmationComponent, {
        data: {response: ''},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.courseService.deleteCourse(id).subscribe( res => {
              if (res.status == 200) {
                this.getCoursesByPage(this.currentIndex);
              }
              this.toastr.show(res.message);
            })
          }
      }); 
    }

    getCoursesByPage(page: any) {
      this.spinnerVisible = true;
      this.courseService.getCourses(page, this.size).subscribe((res: HTTP_PAGEABLE_RESPONSE<any>) => {
        this.courses = res.data.content;
        this.dataSource = new MatTableDataSource<any>(this.courses);
        this.currentIndex = res.data.pageable.pageNumber;
        this.totalItems = res.data.totalElements;
        this.spinnerVisible = false;
     })
    }
}
