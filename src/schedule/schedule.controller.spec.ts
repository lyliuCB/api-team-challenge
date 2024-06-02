import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

describe('ScheduleController', () => {
  let scheduleController: ScheduleController;
  const mockSchedule = {
    id: 'e69a62ae-c69d-4360-a736-0363af78a934',
    account_id: 1111,
    agent_id: 2222,
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: {
            getOne: jest.fn(() => {
              return { schedule: mockSchedule };
            }),
          },
        },
      ],
    }).compile();

    scheduleController = app.get<ScheduleController>(ScheduleController);
  });

  describe('schedule', () => {
    it('should return a schedule with a valid id', async () => {
      const result = await scheduleController.getSchedule({
        id: 'e69a62ae-c69d-4360-a736-0363af78a934',
      });
      expect(result.data).toEqual(mockSchedule);
    });
  });
});
