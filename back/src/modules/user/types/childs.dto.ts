import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray } from 'class-validator';

export class ChildsDTO {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  ids: number[];
}
