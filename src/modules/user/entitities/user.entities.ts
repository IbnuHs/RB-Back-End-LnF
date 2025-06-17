import { Item } from 'src/modules/items/Entities/items.entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

enum userRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum statusJabatan {
  PEGAWAI = 'Pegawai',
  MAHASISWA = 'Mahasiswa',
  TAMU = 'Tamu',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.USER,
  })
  role: userRole;

  @Column({
    type: 'enum',
    enum: statusJabatan,
  })
  statusJabatan: statusJabatan;

  @OneToMany(() => Item, (item) => item.id)
  item: Item[];
}
