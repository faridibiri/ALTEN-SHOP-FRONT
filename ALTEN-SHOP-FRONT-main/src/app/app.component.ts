import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CartService } from "./shared/data-access/cart.service";
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <p-toolbar [style]="{ height: '100px' }">
      <div class="p-toolbar-group-start">
        <img src="assets/icons/icon-72x72.png" alt="logo" />
      </div>
      <div class="p-toolbar-group-center">
        {{ title }}
      </div>
      <div class="p-toolbar-group-end">
        <button pButton icon="pi pi-shopping-cart" 
                class="p-button-text" 
                pBadge
                [value]="cartService.getItemCount().toString()"
                (click)="showCart = true">
        </button>
      </div>
    </p-toolbar>

    <p-splitter [panelSizes]="[20, 80]" [style]="{ height: 'calc(100vh - 100px)' }">
      <ng-template pTemplate>
        <div class="w-full">
          <app-panel-menu />
        </div>
      </ng-template>
      <ng-template pTemplate>
        <div class="w-full app-content">
          <router-outlet></router-outlet>
        </div>
      </ng-template>
    </p-splitter>

    <p-sidebar [(visible)]="showCart" position="right" [style]="{width:'30em'}">
      <h3>Panier</h3>
      @if (cartService.items().length === 0) {
        <p>Votre panier est vide</p>
      } @else {
        @for (item of cartService.items(); track item.id) {
          <div class="flex align-items-center justify-content-between mb-3">
            <div>
              <h4>{{item.name}}</h4>
              <p>Prix: {{item.price}}€</p>
            </div>
            <div class="flex align-items-center gap-2">
              <p-button icon="pi pi-minus" (onClick)="cartService.updateQuantity(item.id, item.quantity - 1)" 
                       styleClass="p-button-sm"></p-button>
              <span>{{item.quantity}}</span>
              <p-button icon="pi pi-plus" (onClick)="cartService.updateQuantity(item.id, item.quantity + 1)"
                       styleClass="p-button-sm"></p-button>
              <p-button icon="pi pi-trash" (onClick)="cartService.removeFromCart(item.id)"
                       styleClass="p-button-danger p-button-sm"></p-button>
            </div>
          </div>
        }
        <div class="flex justify-content-between mt-4">
          <h3>Total:</h3>
          <h3>{{cartService.getTotal()}}€</h3>
        </div>
      }
    </p-sidebar>
  `,
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    SplitterModule, 
    ToolbarModule, 
    BadgeModule,
    ButtonModule,
    SidebarModule,
    PanelMenuComponent
  ],
})
export class AppComponent {
  title = "ALTEN SHOP";
  showCart = false;
  
  protected readonly cartService = inject(CartService);
}