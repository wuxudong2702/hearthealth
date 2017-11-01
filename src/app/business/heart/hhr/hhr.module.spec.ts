import { HhrModule } from './hhr.module';

describe('HhrModule', () => {
  let hhrModule: HhrModule;

  beforeEach(() => {
    hhrModule = new HhrModule();
  });

  it('should create an instance', () => {
    expect(hhrModule).toBeTruthy();
  });
});
