import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { appendFile } from 'fs';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [NgModule, ServerModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
