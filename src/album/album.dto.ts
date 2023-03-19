
import {IsNotEmpty, IsString, IsUrl, IsDate} from 'class-validator';
export class AlbumDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly caraturla: string;
 
 @IsDate()
 @IsNotEmpty()
 readonly descripcion: string;
}