import { Test, TestingModule } from '@nestjs/testing';
import { TaskCreateDTO } from './dto/task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskType } from './task.interface';

const taskCreateDTO: TaskCreateDTO = {
  account_id: 223,
  schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
  start_time: new Date('2024-06-07T01:00:00.000Z'),
  duration: 200,
  type: TaskType.work,
};

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockImplementation((task: TaskCreateDTO) =>
              Promise.resolve({
                id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
                ...task,
              }),
            ),
            update: jest.fn().mockImplementation((id, task: TaskCreateDTO) =>
              Promise.resolve({
                id,
                ...task,
              }),
            ),
            list: jest.fn().mockImplementation(({ account_id, schedule_id }) =>
              Promise.resolve([
                {
                  account_id: 223,
                  schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
                  start_time: new Date('2024-06-07T01:00:00.000Z'),
                  duration: 200,
                  type: TaskType.work,
                  id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
                },
              ]),
            ),
            get: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                account_id: 223,
                agent_id: 22222233,
                start_time: new Date('2024-06-07T01:00:00.000Z'),
                end_time: new Date('2024-06-07T03:00:00.000Z'),
                id,
              }),
            ),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    taskService = app.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a task', () => {
      taskController.create(taskCreateDTO);
      expect(taskController.create(taskCreateDTO)).resolves.toEqual({
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        ...taskCreateDTO,
      });
      expect(taskService.create).toHaveBeenCalledWith(taskCreateDTO);
    });
  });

  describe('update()', () => {
    it('should update a task', () => {
      taskController.update(
        '63872dfe-760c-40e3-a725-dfb5bcebd017',
        taskCreateDTO,
      );
      expect(
        taskController.update(
          '63872dfe-760c-40e3-a725-dfb5bcebd017',
          taskCreateDTO,
        ),
      ).resolves.toEqual({
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        ...taskCreateDTO,
      });
      expect(taskService.update).toHaveBeenCalledWith(
        '63872dfe-760c-40e3-a725-dfb5bcebd017',
        taskCreateDTO,
      );
    });
  });

  describe('list()', () => {
    it('should find a list of tasks', () => {
      expect(
        taskController.list({ account_id: 233, schedule_id: null }),
      ).resolves.toEqual([
        {
          account_id: 223,
          schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
          start_time: new Date('2024-06-07T01:00:00.000Z'),
          duration: 200,
          type: TaskType.work,
          id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        },
      ]);
      expect(taskService.list).toHaveBeenCalled();
    });
  });

  describe('get()', () => {
    it('should find a task', () => {
      expect(
        taskController.get('63872dfe-760c-40e3-a725-dfb5bcebd017'),
      ).resolves.toEqual({
        account_id: 223,
        agent_id: 22222233,
        start_time: new Date('2024-06-07T01:00:00.000Z'),
        end_time: new Date('2024-06-07T03:00:00.000Z'),
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
      });
      expect(taskService.get).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('should delete the task', () => {
      taskController.delete('63872dfe-760c-40e3-a725-dfb5bcebd017');
      expect(taskService.delete).toHaveBeenCalled();
    });
  });
});
