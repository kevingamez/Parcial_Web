import { PerformerEntity } from 'src/performer/performer.entity';
import { TrackEntity } from 'src/track/track.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

 @OneToMany(() => TrackEntity, track => track.album)
 tracks: TrackEntity[];

 @OneToMany(() => PerformerEntity, performer => performer.albums)
 performers: PerformerEntity[];

}

