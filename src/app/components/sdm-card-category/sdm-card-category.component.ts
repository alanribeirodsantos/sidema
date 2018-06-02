import { Component } from '@angular/core';

@Component({
  selector: 'sdm-card-category',
  templateUrl: './sdm-card-category.component.html',
  styleUrls: ['./sdm-card-category.component.scss']
})
export class SdmCardCategoryComponent{

  categories = [
    {'img': 'assets/images/category-water-resources.svg', 'category': 'Recursos Hidricos', 'subcategory': ['Poluição de açudes, rios e lagos', 'Construção de poços ilegais', 'Mal uso da água de açudes, rios e lagos'], 'institute': 'SEMA'},
    {'img': 'assets/images/category-monoliths.svg', 'category': 'Monólitos', 'subcategory': ['Depedração e poluição', 'Construções irregulares', 'Apropriação irregular sem mandato'], 'institute': 'SEMA'},
    {'img': 'assets/images/category-vegetation.svg', 'category': 'Vegetação', 'subcategory': ['Poluição', 'Queimadas', 'Desmatamento irregular sem mandato'], 'institute': 'SEMA'},
    {'img': 'assets/images/category-historical-patrimony.svg', 'category': 'Patrimônio Historico', 'subcategory': ['Poluição', 'Depedração', 'Ocupação ilegal irregular sem mandato'], 'institute': 'SEMA'}
  ]
  
  constructor() { }

}
