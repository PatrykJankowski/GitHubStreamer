import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import * as moment from 'moment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const Issues = gql`
  query { 
    search(query: "language:JavaScript", type: ISSUE, first: 30) {
      
        nodes {
          ... on Issue {
            createdAt
            title
            url
            repository {
              url
            }
            author {
              avatarUrl
              url
            }
          }
        }
      
    }
  }
`;

/*query {
  repository(owner:"octocat", name:"Spoon-Knife") {
    languages(first:20) {
      edges {
        node {
          name
        }
      }
    }
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

  query {
    user(login:"octocat") {
      issues(first:20) {
        edges {
          node {
            body
            createdAt
            title
            url
            repository {
              url
            }
            author {
              avatarUrl
              url
            }
          }
        }
      }

    }


  }


*/

interface QueryResponse {
  currentUser
  loading
}


@Component({
  selector: 'github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})

export class GithubComponent implements OnInit {
    user: any;
    repos: any;
    username: string = 'octocat';

    repoList: any;
    issues: any;
    issues2: any;

    tab = [];

    loading: boolean;
    currentUser: any;

    constructor(private _githubService: GithubService, private apollo: Apollo) {
      console.log('Github Component Init...');

    }

  stream() {
    this._githubService.updateUsername(this.username);

    this._githubService.getUser().subscribe(user => {
      this.user = user;
      this.user.created_at = moment(user.created_at).format('YYYY-MM-DD h:mm:ss');
    });

    this._githubService.getRepos().then(repos => {
      this._githubService.getData();
      this.repos = repos;
      this.repoList = this._githubService.repos;
      this.issues = this._githubService.issues;
    });
  }

  ngOnInit() {
    this.stream();

    this.apollo.watchQuery<QueryResponse>({
      query: Issues
    }).subscribe(({data}) => {
      this.issues2 = data['search']['nodes'];
      this.loading = data.loading;
      this.currentUser = data.currentUser;

      for (let issue of this.issues2) {
        if (issue.__typename == "Issue") {
          this.tab.push(issue);
        }
      }

    });
  }

}
