import { Test, TestingModule } from '@nestjs/testing';
import { AlbumPerformerService } from './album-performer.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumEntity } from '../album/album.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let performerRepository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let performersList: PerformerEntity[];
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    performerRepository.clear();
    performersList = []

    for (let i = 0; i < 10; i++) {
      const performer: PerformerEntity = await performerRepository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.imageUrl(),
      });
      performersList.push(performer);
      }
      album = await albumRepository.save({
        nombre: faker.lorem.words(3),
        fechaLanzamiento:faker.date.past(),
        caratula: faker.image.imageUrl(),
        descripcion: faker.lorem.paragraph(),
        performers: performersList
      });
    };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('addPerformerAlbum should add an performer to a album', async () => {
    const newPerformer: PerformerEntity = await performerRepository.save({
      nombre: faker.name.fullName(),
      descripcion: faker.lorem.paragraph(),
      imagen: faker.image.imageUrl(),
    });
 
    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.lorem.words(3),
      fechaLanzamiento: faker.date.past(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
    })
 
    const result: AlbumEntity = await service.addPerformerToAlbum(newAlbum.id, newPerformer.id);
   
    expect(result.performers.length).toBe(1);
    expect(result.performers[0]).not.toBeNull();
    expect(result.performers[0].nombre).toBe(newPerformer.nombre)
    expect(result.performers[0].descripcion).toBe(newPerformer.descripcion)
    expect(result.performers[0].imagen).toBe(newPerformer.imagen)
    expect(result.performers.length).toBeLessThanOrEqual(3);
  });

});
