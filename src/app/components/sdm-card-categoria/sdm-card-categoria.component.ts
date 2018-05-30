import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdm-card-categoria',
  templateUrl: './sdm-card-categoria.component.html',
  styleUrls: ['./sdm-card-categoria.component.scss']
})
export class SdmCardCategoriaComponent implements OnInit {

  categorias = [
    {'img': 'assets/images/category-water-resources.svg', 'categoria': 'Recursos Hidricos', 'subcategoria': ['Poluição de açudes, rios e lagos', 'Construção de poços ilegais', 'Mal uso da água de açudes, rios e lagos']},
    {'img': 'assets/images/category-monoliths.svg', 'categoria': 'Monólitos', 'subcategoria': ['Depedração e poluição', 'Construções irregulares', 'Apropriação irregular sem mandato ']},
    {'img': 'assets/images/category-vegetation.svg', 'categoria': 'Vegetação', 'subcategoria': ['Poluição', 'Queimadas', 'Desmatamento irregular sem mandato']},
    {'img': 'assets/images/category-historical-patrimony.svg', 'categoria': 'Patrimônio Historico', 'subcategoria': ['Poluição', 'Depedração', 'Ocupação ilegal irregular sem mandato ']}
  ]
  
  constructor() { }

  ngOnInit() {
  }

}
