import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let taskController: TaskController;
  const mockTask = {
    id: '7dc5319f-69b0-4934-827b-60191fc289b0',
    account_id: 1111,
    schedule_id: 'e69a62ae-c69d-4360-a736-0363af78a934',
    start_time: new Date(),
    duration: new Date(),
    type: 'work',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getOne: jest.fn(() => {
              return { task: mockTask };
            }),
          },
        },
      ],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('Task', () => {
    it('should return a Task with a valid id', async () => {
      const result = await taskController.getTask({
        id: '7dc5319f-69b0-4934-827b-60191fc289b0',
      });
      expect(result.data).toEqual(mockTask);
    });
  });
});
