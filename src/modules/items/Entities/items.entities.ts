import { IsEnum } from 'class-validator';
import { Categories } from 'src/modules/category/entities/category.entitites';
import { Location } from 'src/modules/location/entitites/location.entities';
import { statusJabatan, User } from 'src/modules/user/entitities/user.entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusPengajuan {
  PENDING = 'PENDING',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export enum StatusLaporan {
  ACTIVE = 'ACTIVE',
  CLAIMED = 'CLAIMED',
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: String;

  @Column()
  itemName: String;

  @Column()
  itemDescription: String;

  @Column({
    type: 'enum',
    enum: StatusPengajuan,
    default: StatusPengajuan.PENDING,
  })
  statusPengajuan: StatusPengajuan;

  @Column({
    type: 'enum',
    enum: StatusLaporan,
    default: StatusLaporan.ACTIVE,
  })
  @ManyToOne(() => Categories, (category) => category.id)
  category: Categories;

  @OneToMany(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;
}
