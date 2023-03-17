import { Test, TestingModule } from '@nestjs/testing';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker} from '@faker-js/faker';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumService],
    }).compile();

    
    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new museum', async () => {
    const museum: AlbumEntity = {
      id: "",
      nombre: faker.firstName(),
      caratula: faker.lorem.sentence(),
      fechaLanzamient: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
      descripcion: faker.lorem.sentence(),
      tracks: [],
      performers: []
    }
 
    const newMuseum: AlbumEntity = await service.create(museum);
    expect(newMuseum).not.toBeNull();
 
    const storedMuseum: AlbumEntity = await repository.findOne({where: {id: newMuseum.id}})
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.nombre).toEqual(newMuseum.nombre)
    expect(storedMuseum.descripcion).toEqual(newMuseum.descripcion)
    expect(storedMuseum.fechaLanzamient).toEqual(newMuseum.fechaLanzamient)
    expect(storedMuseum.caratula).toEqual(newMuseum.caratula)
  });
});
