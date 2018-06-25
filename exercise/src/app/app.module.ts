import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ShirtComponent } from './components/shirt/shirt.component';

import { ShirtGenderPipe } from './filters/shirt-filter';
// For material
import { MatTabsModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// For bootstrap tabs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { SizeSelectComponent } from './shared/size-select.component';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ClickOutsideModule } from 'ng-click-outside';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { SignupUserInfoComponent } from './components/signup-user-info/signup-user-info.component';
import { DesignShirtComponent } from './components/design-shirt/design-shirt.component';
import { PaymentCompleteComponent } from './components/payment-complete/payment-complete.component';
import { StylePickerComponent } from './components/style-picker/style-picker.component';
import { ColourPickerComponent } from './components/colour-picker/colour-picker.component';
import { GraphicsPickerComponent } from './components/graphics-picker/graphics-picker.component';
import { TextPickerComponent } from './components/text-picker/text-picker.component';
import { GraphicTextEditorComponent } from './components/graphic-text-editor/graphic-text-editor.component';
import { UserInfoService } from './core/user-info.service';
import { HttpModule } from '@angular/http';
import { BackgroundChangeDirective } from './customDirectives/background-change.directive';
import { StructuralUnlessDirective } from './customDirectives/structural-unless.directive';
import { AllGraphicsComponent } from './components/all-graphics/all-graphics.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'allGraphics', component: AllGraphicsComponent },
  { path: 'graphic/:graphicName', component: GraphicComponent },
  { path: 'catalog', component: CatalogComponent,
    children: [
      { path: 'shopping-cart', component: ShoppingCartComponent }
    ]},
    {path: '**', component: HomeComponent}
  // { }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SignupUserInfoComponent,
    LoginComponent,
    CatalogComponent,
    ShirtComponent,
    ShirtGenderPipe,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    SizeSelectComponent,
    ShippingInfoComponent,
    PaymentMethodComponent,
    DesignShirtComponent,
    PaymentCompleteComponent,
    StylePickerComponent,
    ColourPickerComponent,
    GraphicsPickerComponent,
    TextPickerComponent,
    GraphicTextEditorComponent,
    BackgroundChangeDirective,
    StructuralUnlessDirective,
    AllGraphicsComponent,
    GraphicComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    NgbModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    EcoFabSpeedDialModule,
    ClickOutsideModule,
    HttpModule
  ],
  providers: [
    UserInfoService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
