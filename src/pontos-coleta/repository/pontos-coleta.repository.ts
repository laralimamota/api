import { Injectable, Inject } from '@nestjs/common';
import { PontosColeta } from './entities/pontos-coleta.entity';
import { BetaConnection } from 'src/infra/database/connections/beta.connection';

@Injectable()
export class PontosColetaRepository {
  constructor(@Inject('BETA_CONNECTION') private readonly db: BetaConnection) {}

  async findAll(): Promise<PontosColeta[]> {
    return await this.db.sequelize.models['Usuario'].findAll()[0];
  }

  async findOne(id: number): Promise<PontosColeta> {
    return await this.db.sequelize.models['Usuario'].findByPk(id)[0];
  }

  async create(data: Partial<PontosColeta>): Promise<PontosColeta> {
    return await this.db.sequelize.models['Usuario'].create(data)[0];
  }

  async update(id: number, data: Partial<PontosColeta>): Promise<PontosColeta> {
    await this.db.sequelize.models['Usuario'].update(data, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.db.sequelize.models['Usuario'].destroy({ where: { id } });
  }
}
