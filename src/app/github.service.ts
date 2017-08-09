import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import { Apollo } from 'apollo-angular';
//import gql from 'graphql-tag';

@Injectable()
export class GithubService {

  constructor(private _http: Http, /*private apollo: Apollo*/) {
    console.log('Github Service Init...');
  }
  private username = 'PatrykJankowski';
  private client_id = '84bc666f789c3e5c340f';
  private client_secret= '3132d8ed7592e2a71017c38574575ad9b65b9573';

  public temp: any;
  public repos: any = [];
  public issues: any = [];
  repoLang: String = 'All';

/*  ngOnInit() {
   /!* // or this.apollo.watchQuery() - read the docs
    this.apollo.query({
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
    });*!/
  }*/


  getUser() {
    return this._http.get('https://api.github.com/users/' + this.username)
      .map(res => res.json());
  }

  getRepos() {
    return this._http.get('https://api.github.com/users/' + this.username + '/repos?client_id=' + this.client_id + '&client_secret=' + this.client_secret)
      .map(res => { this.temp = res.json(); return this.temp; })
      .toPromise();
  }

  updateUsername(username: string) {
    this.username = username;
  }

  getData() {
    this.repos = [];
    for (let repo of this.temp) {
      if (repo.language == this.repoLang) {
        this.repos.push(repo.name);
      } else if (this.repoLang = 'All') {
        this.repos.push(repo.name);
      }
    }
    this.getIssues();
  }

  getIssues() {

    this.issues = [];

    // We call API to many times in the loop - it has to be fixed
    for (let repo of this.repos) {
      this._http.get('https://api.github.com/repos/' + this.username + '/' + repo + '/issues').map(res => {

        for (let x of res.json()) {
          console.log(x);
          if (x.title != '') {
            this.issues.push({
              title: x.title,
              body: x.body,
              created_at: x.created_at,
              url: x.url,
              avatar: x.user.avatar_url
            });
          }
        }

      }).toPromise().then(res => {
        this.sortByKey(this.issues, 'created_at');
      });

    }
    console.log(this.issues);
    return this.issues;
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      let y = a[key]; let x = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
