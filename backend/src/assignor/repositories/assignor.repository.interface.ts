import { CreateAssignorInputDTO } from '../dto/create-assignor.input.dto';
import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IAssignorRepository {
  abstract save(
    createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<AssignorEntity>;
}