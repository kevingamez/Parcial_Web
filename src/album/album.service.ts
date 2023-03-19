import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AlbumEntity } from './album.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';



@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["tracks", "performers"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["tracks", "performers"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
   
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.nombre == null || album.nombre == "")
            throw new BusinessLogicException("The album name is required", BusinessError.BAD_REQUEST);
        if (album.descripcion == null || album.descripcion == "")
            throw new BusinessLogicException("The album descripcion is required", BusinessError.BAD_REQUEST);
        
        return await this.albumRepository.save(album);
    }

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations: ["tracks"]});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        if (album.tracks.length > 0)
            throw new BusinessLogicException("The album has tracks and cannot be deleted", BusinessError.CONFLICT);
        await this.albumRepository.remove(album);
    }
  
}
