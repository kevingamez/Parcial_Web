import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 caratula: string;
 
 @Column()
 fechaLanzamient: Date;
 
 @Column()
 descripcion: string;
 
}