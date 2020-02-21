import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  public name: string;

  @Column({ name: 'username', type: 'varchar', length: 100 })
  public username: string;

  @Column({ name: 'password', type: 'text' })
  public password: string;

  @Column({ name: 'role_user', type: 'varchar', length: 30 })
  public role_user: string;
}
