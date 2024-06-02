import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { TaskType } from './task.interface';
import { Schedule } from '../schedule/schedule.entity';

const taskArray = [
  {
    account_id: 223,
    schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
    start_time: new Date('2024-06-07T01:00:00.000Z'),
    duration: 200,
    type: TaskType.work,
    id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
  },
  {
    account_id: 223,
    schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
    start_time: new Date('2024-06-07T01:00:00.000Z'),
    duration: 200,
    type: TaskType.break,
    id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
  },
];

const oneTask = {
  account_id: 223,
  schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
  start_time: new Date('2024-06-07T01:00:00.000Z'),
  duration: 200,
  type: TaskType.break,
  id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
};

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findBy: jest.fn().mockResolvedValue(taskArray),
            findOneBy: jest.fn().mockResolvedValue(oneTask),
            save: jest.fn().mockResolvedValue(oneTask),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(oneTask),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a task', () => {
      expect(
        service.create({
          account_id: 223,
          schedule_id: '7b07c65e-d681-4598-be1f-e0652c2bc5ee',
          start_time: new Date('2024-06-07T01:00:00.000Z'),
          duration: 200,
          type: TaskType.break,
        }),
      ).resolves.toEqual(oneTask);
    });
  });

  describe('list()', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.list({ account_id: 222 });
      expect(tasks).toEqual(taskArray);
    });
  });

  describe('get()', () => {
    it('should get a single task', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(
        service.get('93872dfe-760c-40e3-a725-dfb5bcebd017'),
      ).resolves.toEqual(oneTask);
      expect(repoSpy).toBeCalledWith({
        id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
      });
    });
  });

  describe('delete()', () => {
    it('should call delete with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.delete(
        '93872dfe-760c-40e3-a725-dfb5bcebd017',
      );
      expect(removeSpy).toBeCalledWith({
        id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
      });
      expect(retVal.message).toBe("Task 93872dfe-760c-40e3-a725-dfb5bcebd017 deleted");
    });
  });
});
