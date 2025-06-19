import { Categories } from 'src/modules/category/entities/category.entitites';
import { Location } from 'src/modules/location/entitites/location.entities';
import { User } from 'src/modules/user/entitities/user.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

export enum JenisLaporan {
  KEHILANGAN = 'KEHILANGAN',
  PENEMUAN = 'PENEMUAN',
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  itemName: String;

  @Column({
    type: 'text',
  })
  urlImage: String;

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
  statusLaporan: StatusLaporan;

  @Column({
    type: 'enum',
    enum: JenisLaporan,
  })
  jenisLaporan: JenisLaporan;

  @ManyToOne(() => Categories, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'locationId' })
  location: Location;
}
