import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-report-category',
  templateUrl: './sdm-report-category.component.html',
  styleUrls: ['./sdm-report-category.component.scss']
})
export class SdmReportCategoryComponent implements OnInit {

  @Input() category:string;
  categoryName:string;

  ngOnInit(): void {
    this.setCategoryName();
  }

  setCategoryName() {
    if(this.category == "historical-patrimony") {
      this.categoryName = "Patrimônio histórico";
    }
    else if (this.category == "monoliths") {
      this.categoryName = "Monólitos";
    }
    else if (this.category == "vegetation") {
      this.categoryName = "Vegetação";
    }
    else if (this.category == "water-resources") {
      this.categoryName = "Recursos hídricos";
    }
    else {
      throw new Error("Category not found");
    }
  }

}
