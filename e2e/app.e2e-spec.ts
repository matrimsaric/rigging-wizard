import { RiggingWizardPage } from './app.po';

describe('rigging-wizard App', () => {
  let page: RiggingWizardPage;

  beforeEach(() => {
    page = new RiggingWizardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
