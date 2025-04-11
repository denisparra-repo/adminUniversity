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
import { GradeService } from '../../services/grade.service';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressSpinnerModule, DeleteItemConfirmationComponent],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.scss'
})
export class GradeListComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Subject', 'Grade', 'Description', 'Actions'];
    
    grades: Array<any> = [];
    dataSource = new MatTableDataSource<any>(this.grades);
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
        private gradeService: GradeService,
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
      this.getGradesByPage(0);
    }

    // isToggled
    isToggled = false;

    eventPage(e: any) {
      this.getGradesByPage(e.pageIndex);
    }
    

    editGrade(id: number) {
      this.router.navigate(['/grade-editor', id]);
    }

    deleteGrade(id: any): void {
      const dialogRef = this.dialog.open(DeleteItemConfirmationComponent, {
        data: {response: ''},
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.gradeService.deleteGrade(id).subscribe( res => {
              if (res.status == 200) {
                this.getGradesByPage(this.currentIndex);
              }
              this.toastr.show(res.message);
            })
          }
      }); 
    }

    getGradesByPage(page: any) {
      this.spinnerVisible = true;
      this.gradeService.getGrades(page, this.size).subscribe((res: HTTP_PAGEABLE_RESPONSE<any>) => {
        this.grades = res.data.content;
        this.dataSource = new MatTableDataSource<any>(this.grades);
        this.currentIndex = res.data.pageable.pageNumber;
        this.totalItems = res.data.totalElements;
        this.spinnerVisible = false;
     })
    }
}
