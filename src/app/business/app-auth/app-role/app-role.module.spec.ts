import { AppRoleModule } from './app-role.module';

describe('AppRoleModule', () => {
  let appRoleModule: AppRoleModule;

  beforeEach(() => {
    appRoleModule = new AppRoleModule();
  });

  it('should create an instance', () => {
    expect(appRoleModule).toBeTruthy();
  });
});
