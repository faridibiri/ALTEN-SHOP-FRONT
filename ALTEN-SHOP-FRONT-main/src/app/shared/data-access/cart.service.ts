import { Injectable, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  public readonly items = this._items.asReadonly();

  addToCart(product: Product, quantity: number = 1) {
    this._items.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { ...product, quantity }];
    });
  }

  removeFromCart(productId: number) {
    this._items.update(items => items.filter(item => item.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this._items.update(items => 
      items.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }

  getTotal() {
    return this.items().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items().reduce((count, item) => count + item.quantity, 0);
  }
}