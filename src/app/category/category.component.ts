import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriesService } from '../services/categories.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],

})
export class CategoryComponent implements OnInit {

  show: boolean;
  categoryNames: string[] = []
  values : any;
  category : string;
  categories: any

  constructor(private _category: CategoriesService, private _cdr: ChangeDetectorRef) { }

  catSelected(catIndex : string, $element){
   const index = this.categories.findIndex(category => {
      return Object.keys(category)[0] === catIndex;
    })
    this.values = this.categories[index];
    this.category = catIndex;
    this.show = false;
    this._cdr.detectChanges();
    this.show = true;
    this._cdr.detectChanges();
    this.scrollToElement($element);
  }

  getPath(name: string) {
    return this._category.getPath(name)
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start"})
  }

  ngOnInit() {
    this.categories = this._category.getCategories()
    this.categories.map(category => {
      this.categoryNames.push(Object.keys(category)[0])
    })
  }
}


