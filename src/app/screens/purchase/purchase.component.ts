import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import Item from 'src/app/services/item.interface';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  constructor(private router: Router, private crud: CrudService) {}
  id: number = 0;
  allprice: number = 0;
  text: string = '';
  price: number = 0;
  img: string = '';
  num: number = 0;
  modalTitle: string = '';
  modalPrice: number = 0;
  modalImg: string = '';
  modalNum: number = 0;
  modalId: number = 0;
  idNum: number = 1;
  add_button: boolean = true;
  save_button: boolean = false;

  list: Item[] = [];
  ngOnInit(): void {
    this.router.navigate(['/']);
    this.crud.getAll().subscribe((data) => {
      console.log(data);
      this.list = data;
    });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  addItem(
    text: string,
    price: number,
    img: string,
    num: number
  ) {
    if (
      text != '' &&
      img != '' &&
      !isNaN(price) &&
      !isNaN(num) &&
      price > 0 &&
      num > 0
    ) {
      this.crud.post(this.list.length + 1, text, price, img, num, price * num);
    } else {
      alert('Пустая строка идиот!');
    }
    this.text = '';
    this.price = 0;
    this.img = '';
    this.num = 0;
  }
  items(purchase: string, price: number, img: string, num: number, id: number) {
    this.modalTitle = purchase;
    this.modalPrice = price;
    this.modalImg = img;
    this.modalNum = num;
    this.modalId = id;
  }
  editItem(text: string, price: number, img: string, num: number, id: number) {
    this.idNum = id;
    this.router.navigate([`item/${id}`]);
    this.text = text;
    this.price = price;
    this.img = img;
    this.num = num;
    this.add_button = false;
    this.save_button = true;
  }
  objIndex: any;
  saveItem(text: string, price: number, img: string, num: number) {
    this.router.navigate(['/']);
    this.crud.update(this.idNum, text, price, img, num, price * num);
    this.add_button = true;
    this.save_button = false;
    this.text = '';
    this.price = 0;
    this.img = '';
    this.num = 0;
  }
  deleteItem(id: number) {
    this.crud.delete(id);
  }
}
