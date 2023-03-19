import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerformerModule } from './performer/performer.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer/performer.entity';
import { TrackEntity } from './track/track.entity';
import { AlbumEntity } from './album/album.entity';
import { PerformerAlbumModule } from './performer-album/performer-album.module';
import { AlbumPerformerModule } from './album-performer/album-performer.module';

@Module({
  imports: [PerformerModule, TrackModule, AlbumModule, PerformerAlbumModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'marketplace',
    entities: [PerformerEntity, TrackEntity, AlbumEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
  AlbumPerformerModule,
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
