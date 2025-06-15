import { Item } from 'src/modules/items/Entities/items.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  location: String;

  @OneToMany(() => Item, (item) => item.id)
  item: Item[];
}
