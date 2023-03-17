import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>
    ){}

    async findAll(): Promise<TrackEntity[]> {
        // return await this.trackRepository.find({ relations: ["album"] });
        return await this.trackRepository.find();
    }

    async findOne(id: string): Promise<TrackEntity> {
        //const track: TrackEntity = await this.trackRepository.findOne({where: {id}} );
        const track: TrackEntity = await this.trackRepository.findOne({where: {id}, relations: ["album"] } );
        if (!track)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
   
        return track;
    }

    async create(track: TrackEntity): Promise<TrackEntity> {
        return await this.trackRepository.save(track);
    }

    async delete(id: string) {
        const track: TrackEntity = await this.trackRepository.findOne({where:{id}});
        if (!track)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.trackRepository.remove(track);
    }
}
