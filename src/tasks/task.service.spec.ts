import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from '../schedule/schedule.entity';

describe('taskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  const TaskRepositoryToken: string | Function = getRepositoryToken(Task);

  const mockTask = {
    id: '7dc5319f-69b0-4934-827b-60191fc289b0',
    account_id: 1111,
    schedule_id: 'e69a62ae-c69d-4360-a736-0363af78a934',
    start_time: new Date(),
    duration: new Date(),
    type: 'work',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Schedule),
          useClass: Repository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(TaskRepositoryToken);
  });

  describe('task', () => {
    it('should return a task with a valid id', async () => {
      taskService.getOne = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ task: mockTask }));

      const result = await taskService.getOne(
        `e69a62ae-c69d-4360-a736-0363af78a934`,
      );
      expect(result?.task).toEqual(mockTask);
    });

    it('should return error with a invalid id', async () => {
      jest.spyOn(taskRepository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await taskService.getOne(`111111-1111-1111-1111-1111111`);
      expect(result?.task).toEqual(undefined);
    });
  });
});
