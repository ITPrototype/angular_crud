import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Item from './item.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  API_URL: string = 'http://localhost:3000/list';

  getAll() {
    return this.http.get<Item[]>(this.API_URL);
  }
  post(
    id: number,
    text: string,
    price: number,
    img: string,
    num: number,
    allprice: number
  ) {
    const body = {
      id: id,
      purchase: text,
      price: price,
      img: img,
      num: num,
      allprice: allprice,
    };
    this.http.post<Item>(this.API_URL, body).subscribe((data) => {
      if (data.id === id) {
        id = data.id;
        text = data.purchase;
        price = data.price;
        img = data.img;
        num = data.num;
        allprice = data.allprice;
      }
    });
    window.location.reload();
  }
  update(
    id: number,
    text: string,
    price: number,
    img: string,
    num: number,
    allprice: number
  ) {
    const body = {
      id: id,
      purchase: text,
      price: price,
      num: num,
      img: img,
      allprice: allprice,
    };
    this.http.put<Item>(this.API_URL + '/' + id, body).subscribe((data) => {
      if (data.id === id) {
        id = data.id;
        text = data.purchase;
        price = data.price;
        img = data.img;
        allprice = data.allprice;
      }
    });
    window.location.reload();
  }
  delete(id: number) {
    this.http.delete(this.API_URL + '/' + id).subscribe({
      next: (data) => {
        console.log(data, ' deleted successfully');
      },
    });
    window.location.reload();
  }
}
