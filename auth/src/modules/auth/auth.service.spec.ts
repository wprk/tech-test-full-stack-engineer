import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.accessTokenSecret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
