import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user.service'; // 👈 importa o UsersService

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: UsersService, // 👈 injeta um mock para o NestJS não quebrar
          useValue: {
            createUser: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Test User',
              email: 'test@example.com',
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
