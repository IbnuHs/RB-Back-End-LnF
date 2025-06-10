import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum userRole {
  ADMIN = 'Admin',
  USER = 'User',
}

enum statusJabatan {
  PEGAWAI = 'Pegawai',
  MAHASISWA = 'Mahasiswa',
  TAMU = 'Tamu',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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
  })
  role: userRole;

  @Column({
    type: 'enum',
    enum: statusJabatan,
  })
  statusJabatan: statusJabatan;
}
