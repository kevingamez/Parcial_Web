import { Test, TestingModule } from '@nestjs/testing';
import { PerformerAlbumService } from './performer-album.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumEntity } from '../album/album.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';


describe('PerformerAlbumService', () => {
  let service: PerformerAlbumService;
  let performerRepository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let performer: PerformerEntity;
  let albumsList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerAlbumService],
    }).compile();

    service = module.get<PerformerAlbumService>(PerformerAlbumService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    performerRepository.clear();
    albumsList = []

    for (let i = 0; i < 10; i++) {
      const album: AlbumEntity = await albumRepository.save({
        nombre: faker.lorem.words(3),
        fechaLanzamiento: faker.date.past(),
        caratula: faker.image.imageUrl(),
        descripcion: faker.lorem.paragraph(),
      });
      albumsList.push(album);
     }
     performer = await performerRepository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.imageUrl(),
        albums: albumsList
      });

  }
});
