import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public user_id: number;

  @Column({
    type: 'varchar',
    length: 40,
  })
  public fio: string;

  @Column({
    type: 'smallint',
  })
  public age: number;

  @ManyToOne(() => User, (user) => user.user_id)
  mother: User;

  @ManyToOne(() => User, (user) => user.user_id)
  father: User;
}
