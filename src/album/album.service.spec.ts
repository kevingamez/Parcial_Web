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
  let albumsList: AlbumEntity[];

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
    albumsList = []
    for(let i = 0; i < 10; i++){
      const album: AlbumEntity = await repository.save({
        nombre: faker.name.firstName(),
        caratula: faker.lorem.sentence(),
        fechaLanzamiento: faker.date.past(),
        descripcion: faker.lorem.sentence(),
        tracks: [],
        performers: []
      });
      albumsList.push(album);

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
      fechaLanzamiento: faker.date.past(),
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
    expect(storedAlbum.fechaLanzamiento).toEqual(newAlbum.fechaLanzamiento)
    expect(storedAlbum.caratula).toEqual(newAlbum.caratula)
  });

  it('create an user with empty description should thrown exception', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.name.firstName(),
      caratula: faker.lorem.sentence(90),
      fechaLanzamiento: faker.date.past(),
      descripcion:'',
      tracks: [],
      performers: []
    }
    await expect(() => service.create(album)).rejects.toHaveProperty('message', 'The album descripcion is required');
  });

  it('create an user with empty name should thrown exception', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: '',
      caratula: faker.image.imageUrl(),
      fechaLanzamiento: faker.date.past(),
      descripcion:faker.lorem.sentence(90),
      tracks: [],
      performers: []
    }
    await expect(() => service.create(album)).rejects.toHaveProperty('message', 'The album name is required');
  });
  
  it('findAll shoudl return all albums', async () => {
    const albums : AlbumEntity[] = await service.findAll();
    expect(albums).not.toBeNull();
    expect(albums).toHaveLength(albumsList.length);
  });


  it('findOne should return a album by id', async () => {
    const storedAlbum: AlbumEntity = albumsList[0];
    const album: AlbumEntity = await service.findOne(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.nombre).toEqual(storedAlbum.nombre);
    expect(album.caratula).toEqual(storedAlbum.caratula);
    expect(album.fechaLanzamiento).toEqual(storedAlbum.fechaLanzamiento);
    expect(album.descripcion).toEqual(storedAlbum.descripcion);
  });

  it('findOne should throw an exception for an invalid user', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty('message', 'The album with the given id was not found');
  });

  it('delete should delete an existing album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.delete(album.id);
    const deletALbum: AlbumEntity = await repository.findOne({where: {id: album.id} });
    expect(deletALbum).toBeNull();
  });

  it('delete should throw an exception for an invalid user', async () => {
    const user: AlbumEntity = albumsList[0];
    await expect(() => service.delete('0')).rejects.toHaveProperty('message', 'The album with the given id was not found');
  });

});
 