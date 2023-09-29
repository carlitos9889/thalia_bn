import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  username: string;
  @Column('text')
  lastName: string;
  @Column('text')
  password: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { array: true, default: ['user'] })
  role: string[];
  @Column('text')
  organismo: string;
  @Column('text')
  address: string;
  @Column('boolean', { default: false })
  isDeleted: boolean;
}
