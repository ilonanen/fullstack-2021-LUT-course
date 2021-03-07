import { BirddiaryAuthPage } from './app.po';

describe('birddiary-auth App', function() {
  let page: BirddiaryAuthPage;

  beforeEach(() => {
    page = new BirddiaryAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
