import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { TaskType } from './task.interface';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_id: number;

  @Column()
  schedule_id: string;

  @Column()
  start_time: Date;

  @Column()
  duration: number;

  @Column()
  type: TaskType;

  @ManyToOne(() => Schedule, (schedule) => schedule.tasks)
  schedule: Schedule;
}
