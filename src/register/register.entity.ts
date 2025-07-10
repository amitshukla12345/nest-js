import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('register1') // 👈 this forces table name to be 'register1'
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Viewer' })
  role: string;
}
