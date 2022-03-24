import { BasicDetailsModule } from './basic-details.module';

describe('BasicDetailsModule', () => {
  let basicDetailsModule: BasicDetailsModule;

  beforeEach(() => {
    basicDetailsModule = new BasicDetailsModule();
  });

  it('should create an instance', () => {
    expect(basicDetailsModule).toBeTruthy();
  });
});
