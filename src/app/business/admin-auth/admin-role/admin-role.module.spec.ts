import { AdminRoleModule } from './admin-role.module';

describe('AdminRoleModule', () => {
  let adminRoleModule: AdminRoleModule;

  beforeEach(() => {
    adminRoleModule = new AdminRoleModule();
  });

  it('should create an instance', () => {
    expect(adminRoleModule).toBeTruthy();
  });
});
