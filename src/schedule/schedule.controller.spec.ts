import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleCreateDTO } from './dto/schedule.dto';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

const scheduleCreateDTO: ScheduleCreateDTO = {
  account_id: 223,
  agent_id: 22222233,
  start_time: new Date('2024-06-07T01:00:00.000Z'),
  end_time: new Date('2024-06-07T03:00:00.000Z'),
};

describe('ScheduleController', () => {
  let scheduleController: ScheduleController;
  let scheduleService: ScheduleService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        {
          provide: ScheduleService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((schedule: ScheduleCreateDTO) =>
                Promise.resolve({
                  id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
                  ...schedule,
                }),
              ),
            update: jest
              .fn()
              .mockImplementation((id, schedule: ScheduleCreateDTO) =>
                Promise.resolve({
                  id,
                  ...schedule,
                }),
              ),
            list: jest.fn().mockImplementation(({ account_id, agent_id }) =>
              Promise.resolve([
                {
                  account_id,
                  agent_id: 22222233,
                  start_time: new Date('2024-06-07T01:00:00.000Z'),
                  end_time: new Date('2024-06-07T03:00:00.000Z'),
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

    scheduleController = app.get<ScheduleController>(ScheduleController);
    scheduleService = app.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(scheduleController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a schedule', () => {
      scheduleController.create(scheduleCreateDTO);
      expect(scheduleController.create(scheduleCreateDTO)).resolves.toEqual({
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        ...scheduleCreateDTO,
      });
      expect(scheduleService.create).toHaveBeenCalledWith(scheduleCreateDTO);
    });
  });

  describe('update()', () => {
    it('should update a schedule', () => {
      scheduleController.update(
        '63872dfe-760c-40e3-a725-dfb5bcebd017',
        scheduleCreateDTO,
      );
      expect(
        scheduleController.update(
          '63872dfe-760c-40e3-a725-dfb5bcebd017',
          scheduleCreateDTO,
        ),
      ).resolves.toEqual({
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        ...scheduleCreateDTO,
      });
      expect(scheduleService.update).toHaveBeenCalledWith(
        '63872dfe-760c-40e3-a725-dfb5bcebd017',
        scheduleCreateDTO,
      );
    });
  });

  describe('list()', () => {
    it('should find a list of schedules', () => {
      expect(scheduleController.list({ account_id: 233, agent_id: null })).resolves.toEqual([
        {
          account_id: 233,
          agent_id: 22222233,
          start_time: new Date('2024-06-07T01:00:00.000Z'),
          end_time: new Date('2024-06-07T03:00:00.000Z'),
          id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
        },
      ]);
      expect(scheduleService.list).toHaveBeenCalled();
    });
  });

  describe('get()', () => {
    it('should find a schedule', () => {
      expect(
        scheduleController.get('63872dfe-760c-40e3-a725-dfb5bcebd017'),
      ).resolves.toEqual({
        account_id: 223,
        agent_id: 22222233,
        start_time: new Date('2024-06-07T01:00:00.000Z'),
        end_time: new Date('2024-06-07T03:00:00.000Z'),
        id: '63872dfe-760c-40e3-a725-dfb5bcebd017',
      });
      expect(scheduleService.get).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('should delete the schedule', () => {
      scheduleController.delete('63872dfe-760c-40e3-a725-dfb5bcebd017');
      expect(scheduleService.delete).toHaveBeenCalled();
    });
  });
});
