import { AlbumEntity } from '../album/album.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PerformerEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 description: string;
 
 @Column()
 imagen: string;
 
 @OneToMany(() => AlbumEntity, album => album.performers)
 albums: AlbumEntity[];
}