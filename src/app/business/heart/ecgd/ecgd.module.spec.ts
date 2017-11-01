import { EcgdModule } from './ecgd.module';

describe('EcgdModule', () => {
  let ecgdModule: EcgdModule;

  beforeEach(() => {
    ecgdModule = new EcgdModule();
  });

  it('should create an instance', () => {
    expect(ecgdModule).toBeTruthy();
  });
});
