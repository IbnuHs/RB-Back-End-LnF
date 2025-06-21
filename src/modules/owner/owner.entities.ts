import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../items/Entities/items.entities';

@Entity()
export class OwnerItems {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: String;

  @Column({ type: 'timestamp' })
  dateClaim: Date;

  @OneToOne(() => Item, (item) => item.owner, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item' })
  item: Item;
}
