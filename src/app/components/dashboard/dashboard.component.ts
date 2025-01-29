import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public model! : any[];
  constructor() {
  }
  ngOnInit() {
    const storedData = localStorage.getItem('menuDet');
    this.model = storedData ? JSON.parse(storedData) : null;
    console.log(this.model)
  }
  
}
