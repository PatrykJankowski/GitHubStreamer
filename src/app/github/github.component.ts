import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
//import {Apollo} from 'apollo-angular';
//import gql from 'graphql-tag';


@Component({
  selector: 'github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})

export class GithubComponent implements OnInit {
    user: any;
    repos: any;
    username: string;

    repoList: any;
    issues: any;

    constructor(private _githubService: GithubService /*private apollo: Apollo*/) {
      console.log('Github Component Init...');

     /* this.apollo.query({
        query: gql`
                {
                    repository(owner: "octocat", name: "Hello-World") {
                        issues(last:20, states:CLOSED) {
                            edges {
                                node {
                                    title
                                    url
                                    labels(first:5) {
                                        edges {
                                            node {
                                                name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `
      }).subscribe(response => {
        console.log('data', response.data);
      });*/
    }

  search() {
    this._githubService.updateUsername(this.username);

    this._githubService.getUser().subscribe(user => {
      this.user = user;
    });

    this._githubService.getRepos().then(repos => {
      this._githubService.getData();
      this.repos = repos;
      this.repoList = this._githubService.repos;
      this.issues = this._githubService.issues;
    });

    //this.repoList = this._githubService.getData();
    //this._githubService.getIssues();
    //this._githubService.xx();
  }

  ngOnInit() {}

}
