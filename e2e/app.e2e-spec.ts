import { JukePage } from './app.po';

describe('juke App', () => {
  let page: JukePage;

  beforeEach(() => {
    page = new JukePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
