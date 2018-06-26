import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sdm-filter-chip',
  templateUrl: './sdm-filter-chip.component.html',
  styleUrls: ['./sdm-filter-chip.component.scss']
})
export class SdmFilterChipComponent {

  @Input() filterName:string;
  @Output() clickedremoveFilter:EventEmitter<any> = new EventEmitter();

  removeFilter() {
    this.clickedremoveFilter.emit();
  }

}
