import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumPerformerService {

    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>,
    
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) {}


    async addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id: performerId}});
        if (!performer)
          throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
      
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["performers"]})
        if (!album)
          throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
        if (album.performers.length > 3)
          throw new BusinessLogicException("The album has 3 performers and cannot be added more", BusinessError.CONFLICT);

        album.performers = [...album.performers, performer];
        return await this.albumRepository.save(album);
      }
}
