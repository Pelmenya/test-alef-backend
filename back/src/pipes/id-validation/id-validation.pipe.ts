import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BAD_OBJECT_ID } from './id-validation.pipe.constatnts';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string) {
    if (value.search(/^[0-9]+$/g) !== -1) return value;
    throw new BadRequestException(BAD_OBJECT_ID);
  }
}
