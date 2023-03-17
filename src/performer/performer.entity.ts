import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PerformerEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 description: string;
 
 @Column()
 imagen: string;
 
}