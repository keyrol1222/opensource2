import { Test, TestingModule } from '@nestjs/testing';
import { FuelsController } from './fuels.controller';

describe('FuelsController', () => {
  let controller: FuelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelsController],
    }).compile();

    controller = module.get<FuelsController>(FuelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
