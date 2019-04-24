import { Component, OnInit } from '@angular/core';
import { SandwichService } from './sandwich.service';
import { Sandwich } from './sandwich';
import { CustomSandwichPayload } from './custom-sandwich' ;

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css']
})
export class SandwichComponent implements OnInit {

  public sandwiches;
  public selectedSandwich;
  public menuTabActive = true;
  public customSandwich: CustomSandwichPayload;
  public inflation: number;
  public customPrice: number;

  constructor(public sandwichService: SandwichService) {
    this.sandwiches = [];
    this.customSandwich = new CustomSandwichPayload();
    this.inflation = 1.0;
    this.customPrice = 0.0;
  }

  ngOnInit() {
    this.getSandwichList();
  }

  public getSandwichList(inflation: number = 1.0) {
    this.sandwichService.getSandwichList(inflation).subscribe(list => {
      this.sandwiches = list;
    });
  }

  public getSandwichPrice(inflation: number = 1.0) {
    this.sandwichService.getSandwichPrice(this.customSandwich, inflation).subscribe(response => {
      this.customPrice = parseFloat(response.price);
    });
  }

  public onSelect(sandwich: Sandwich): void {
    this.selectedSandwich = sandwich;
  }

  public onTabSelect(tabName: string): void {
    if ( tabName === 'custom' ) {
      this.menuTabActive = false;
    } else {
      this.menuTabActive = true;
    }
  }

  public setInflation(value: string): void {
    this.inflation = parseFloat(value);
    this.getSandwichList(this.inflation);
    this.setIngredient();
  }

  public setIngredient(): void {
    this.getSandwichPrice(this.inflation);
  }

}
