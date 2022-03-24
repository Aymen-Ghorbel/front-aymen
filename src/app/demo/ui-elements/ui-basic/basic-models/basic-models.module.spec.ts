import { BasicModelsModule } from './basic-models.module';

describe('BasicModelsModule', () => {
  let basicModelsModule: BasicModelsModule;

  beforeEach(() => {
    basicModelsModule = new BasicModelsModule();
  });

  it('should create an instance', () => {
    expect(basicModelsModule).toBeTruthy();
  });
});
