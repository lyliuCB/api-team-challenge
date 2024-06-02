import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_id: number;

  @Column()
  agent_id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @OneToMany(() => Task, (task) => task.schedule)
  tasks: Task[];
}
