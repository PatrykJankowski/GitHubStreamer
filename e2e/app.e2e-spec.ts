import { GithubStreamClientPage } from './app.po';

describe('github-stream-client App', () => {
  let page: GithubStreamClientPage;

  beforeEach(() => {
    page = new GithubStreamClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
