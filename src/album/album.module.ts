import { Module } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService]
})
export class AlbumModule {}
