import { Item } from 'src/modules/items/Entities/items.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column()
  category: String;

  @OneToMany(() => Item, (item) => item.category)
  item: Item[];
}
