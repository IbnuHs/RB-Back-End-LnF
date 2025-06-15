import { Categories } from 'src/modules/category/entities/category.entitites';
import { User } from 'src/modules/user/entitities/user.entities';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: String;

  @Column()
  itemName: String;

  @Column()
  itemDescription: String;

  @ManyToOne(() => Categories, (category) => category.id)
  category: Categories;

  @OneToMany(() => User, (user) => user.id)
  user: User;
}
