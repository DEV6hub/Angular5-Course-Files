import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GuardDogService} from "./core/guard-dog.service";
@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: "", redirectTo: "cats", pathMatch: "full" },
			{ path: "dogs", loadChildren: "app/dogs/dog.module#DogModule", canActivate: [GuardDogService] }
		])
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}