import { TypeOrmModule } from '@nestjs/typeorm'
import { AlbumEntity } from 'src/album/album.entity'
import {TrackEntity} from 'src/track/track.entity'
import {PerformerEntity} from 'src/performer/performer.entity'


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [AlbumEntity, PerformerEntity, TrackEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([AlbumEntity, PerformerEntity, TrackEntity])
]
