import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Repository } from 'typeorm';
import { Task } from '../tasks/task.entity';

const scheduleArray = [
  {
    account_id: 223,
    agent_id: 353,
    start_time: new Date('2024-06-07T01:00:00.000Z'),
    end_time: new Date('2024-06-07T01:00:00.000Z'),
    id: '53872dfe-760c-40e3-a725-dfb5bcebd017',
  },
  {
    account_id: 223,
    agent_id: 333,
    start_time: new Date('2024-06-07T01:00:00.000Z'),
    end_time: new Date('2024-06-07T01:00:00.000Z'),
    id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
  },
];

const oneSchedule = {
  account_id: 223,
  agent_id: 333,
  start_time: new Date('2024-06-07T01:00:00.000Z'),
  end_time: new Date('2024-06-07T01:00:00.000Z'),
  id: '93872dfe-760c-40e3-a725-dfb5bcebd017',
};

describe('ScheduleService', () => {
  let service: ScheduleService;
  let repository: Repository<Schedule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            findBy: jest.fn().mockResolvedValue(scheduleArray),
            findOneBy: jest.fn().mockResolvedValue(oneSchedule),
            save: jest.fn().mockResolvedValue(oneSchedule),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findBy: jest.fn().mockResolvedValue(oneSchedule),
          },
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    repository = module.get<Repository<Schedule>>(getRepositoryToken(Schedule));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a schedule', () => {
      expect(
        service.create({
          account_id: 223,
          agent_id: 333,
          start_time: new Date('2024-06-07T01:00:00.000Z'),
          end_time: new Date('2024-06-07T01:00:00.000Z'),
        }),
      ).resolves.toEqual(oneSchedule);
    });
  });

  describe('list()', () => {
    it('should return an array of schedules', async () => {
      const schedules = await service.list({ account_id: 223 });
      expect(schedules).toEqual(scheduleArray);
    });
  });

  describe('get()', () => {
    it('should get a single schedule', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(
        service.get('93872dfe-760c-40e3-a725-dfb5bcebd017'),
      ).resolves.toEqual(oneSchedule);
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
      expect(retVal.message).toBe("Schedule 93872dfe-760c-40e3-a725-dfb5bcebd017 deleted");
    });
  });
});
