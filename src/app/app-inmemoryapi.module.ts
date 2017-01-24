import {NgModule, ModuleWithProviders} from "@angular/core";
import {InMemoryWebApiModule} from 'angular2-in-memory-web-api';
import {InMemoryService} from "./shared/inmemory.models";

@NgModule({
  imports: [
    InMemoryWebApiModule.forRoot(InMemoryService)
  ],
  exports: [
    InMemoryWebApiModule
  ]
})

export class AppInMemoryApiModule {}
