import { AngularImageCropPage } from './app.po';

describe('angular2-image-crop App', function() {
  let page: AngularImageCropPage;

  beforeEach(() => {
    page = new AngularImageCropPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
