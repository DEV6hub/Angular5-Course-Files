import {NgModule, ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {GuardDogService} from "./core/guard-dog.service";

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: "", redirectTo: "cats", pathMatch: "full" },
			{ path: "dogs", loadChildren: "app/dogs/dog.module", canActivate: [GuardDogService]}
		])
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}