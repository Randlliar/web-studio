import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {PopularArticlesType} from "../../../../types/popular-articles.type";
import {CategoriesType} from "../../../../types/categories.type";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  articles: PopularArticlesType[] = [];
  categories: CategoriesType[] = [];
  dialogRef: MatDialogRef<any> | null = null;
  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    type: new FormControl(),
  })

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private requestService: RequestService) {
  }

  ngOnInit(): void {
  }

  getOrder() {
    this.form.get('type')?.setValue('consultation');
    this.dialogRef = this.dialog.open(this.popup);
  }

  getRequest() {
    const formData = this.form.getRawValue();
    this.requestService.createRequest(formData).subscribe();
    this._snackBar.open('Звонок заказан');
    this.dialogRef?.close();
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
  }
}
