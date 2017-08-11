import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { GithubComponent } from './github/github.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApolloModule } from 'apollo-angular';
import { provideClient } from './apollo';


@NgModule({
  declarations: [
    AppComponent,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(provideClient),
    NgbModule.forRoot()

  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
