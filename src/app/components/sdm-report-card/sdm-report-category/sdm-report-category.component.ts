import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-report-category',
  templateUrl: './sdm-report-category.component.html',
  styleUrls: ['./sdm-report-category.component.scss']
})
export class SdmReportCategoryComponent implements OnInit {

  @Input() category:string;
  @Input() context:string;
  categoryType:string;
  categoryName:string;

  ngOnInit(): void {
    this.setCategoryName();
  }

  setCategoryName() {
    if(this.category === "Patrimônio histórico") {
      this.categoryName = "Patrimônio Histórico";
      this.categoryType = "historical-patrimony";
    }
    else if (this.category === "Monólitos") {
      this.categoryName = "Monólitos";
      this.categoryType = "monoliths";
    }
    else if (this.category === "Vegetação") {
      this.categoryName = "Vegetação";
      this.categoryType = "vegetation";
    }
    else if (this.category === "Recursos hídricos") {
      this.categoryName = "Recursos Hídricos";
      this.categoryType = "water-resources";
    }
    else {
      throw new Error("Category not found");
    }
  }

}
