import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fuente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('text')
  organization: string;

  @Column('numeric')
  frequency: number;

  @Column('boolean', {
    default: true,
  })
  isOpen: boolean;

  @Column('text', {
    array: true,
  })
  editores: string[];

  @Column('text')
  materia: string;

  @Column('text')
  url: string;

  //   ID user
}
