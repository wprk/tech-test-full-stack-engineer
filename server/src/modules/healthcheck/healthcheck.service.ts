import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthcheckService {
  getHealthcheck(): object {
    return {'status': 'success'}
  }
}
