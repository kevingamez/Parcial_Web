import { AlbumEntity } from '../album/album.entity';
import { JoinTable, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class PerformerEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 descripcion: string;
 
 @Column()
 imagen: string;
 
 @ManyToMany(() => AlbumEntity, album => album.performers)
 @JoinTable()
 albums: AlbumEntity[];
}