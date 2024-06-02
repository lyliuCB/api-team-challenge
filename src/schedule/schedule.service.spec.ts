import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let scheduleRepository: Repository<Schedule>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  const scheduleRepositoryToken: string | Function =
    getRepositoryToken(Schedule);

  const mockSchedule = {
    id: 'e69a62ae-c69d-4360-a736-0363af78a934',
    account_id: 1111,
    agent_id: 2222,
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useClass: Repository,
        },
      ],
    }).compile();

    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleRepository = module.get<Repository<Schedule>>(
      scheduleRepositoryToken,
    );
  });

  describe('schedule', () => {
    it('should return a schedule with a valid id', async () => {
      scheduleService.getOne = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({ schedule: mockSchedule }),
        );

      const result = await scheduleService.getOne(
        `e69a62ae-c69d-4360-a736-0363af78a934`,
      );
      expect(result?.schedule).toEqual(mockSchedule);
    });

    it('should return error with a invalid id', async () => {
      jest.spyOn(scheduleRepository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await scheduleService.getOne(
        `111111-1111-1111-1111-1111111`,
      );
      expect(result?.schedule).toEqual(undefined);
    });
  });
});
