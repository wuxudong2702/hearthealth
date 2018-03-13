import { GuideModule } from './guide.module';

describe('GuideModule', () => {
  let guideModule: GuideModule;

  beforeEach(() => {
    guideModule = new GuideModule();
  });

  it('should create an instance', () => {
    expect(guideModule).toBeTruthy();
  });
});
