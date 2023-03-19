import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TrackService', () => {
  let service: TrackService; 
  let repository: Repository<TrackEntity>
  let tracks: TrackEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tracks = [];
    for (let i = 0; i < 10; i++) {
      const track : TrackEntity = await repository.save({
        nombre: faker.name.firstName(),
        duracion: parseInt(faker.random.numeric(5)),
      });
      tracks.push(track);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
 