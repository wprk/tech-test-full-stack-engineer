import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshTokenSecret,
    });
  }

  async validate(payload: any) {
    return { type: 'refresh_token', userId: payload.userId, incrementId: payload.incrementId };
  }
}
