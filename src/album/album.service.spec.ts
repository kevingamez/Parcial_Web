import { Test, TestingModule } from '@nestjs/testing';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker} from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';



describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albums: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    
    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase(); 
  });

  const seedDatabase = async () => {
    repository.clear();
    albums = []
    for(let i = 0; i < 5; i++){
      const album: AlbumEntity = await repository.save({
        nombre: faker.name.firstName(),
        caratula: faker.lorem.sentence(),
        fechaLanzamient: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
        descripcion: faker.lorem.sentence(),
        tracks: [],
        performers: []
      });
      albums.push(album);

   };
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 

 
  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.name.firstName(),
      caratula: faker.lorem.sentence(),
      fechaLanzamient: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
      descripcion: faker.lorem.sentence(),
      tracks: [],
      performers: []
    }
 
    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();
 
    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.nombre).toEqual(newAlbum.nombre)
    expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion)
    expect(storedAlbum.fechaLanzamient).toEqual(newAlbum.fechaLanzamient)
    expect(storedAlbum.caratula).toEqual(newAlbum.caratula)
  });
});
