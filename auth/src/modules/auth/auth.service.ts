import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { jwtConstants } from './constants';
import { AuthRegisterInput } from './dto/auth.register.input'
import { AuthLoginResponseDto } from './dto/auth.login.response.dto'
import { AuthRegisterResponseDto } from './dto/auth.register.response.dto'
import { AuthTokenRefreshResponseDto } from './dto/auth.token.refresh.response.dto'
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { User } from 'src/models/user.model'
import { UserService } from '../user/user.service'
import { JwtRefreshPayload } from './interfaces/jwt.refresh.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(payload: JwtPayload): Promise<User | null> {
    const user = await this.userService.findOneById(payload.userId)

    return user || null
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)

    if (user && user.password) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user

        return result
      }
    }

    return null
  }

  async login(user: User): Promise<AuthLoginResponseDto> {
    const payload = { userId: user.id }

    return {
      data: {
        access_token: this.getAccessToken(payload),
        refresh_token: this.getRefreshToken({ ...payload, incrementId: 1 }),
      }
    }
  }

  async refreshToken(user: User): Promise<AuthTokenRefreshResponseDto> {
    const payload = { userId: user.id }
    
    return {
      data: {
        access_token: this.getAccessToken(payload),
        refresh_token: this.getRefreshToken({ ...payload, incrementId: 1 }),
      }
    }
  }

  async register(newUser: AuthRegisterInput): Promise<AuthRegisterResponseDto> {
    const user = await this.userService.create(newUser)

    return {
      data: user
    }
  }

  getAccessToken = (payload: any) => {
    return this.jwtService.sign(
      { type: 'access_token', ...payload },
      { expiresIn: '60s', secret: jwtConstants.accessTokenSecret }
    )
  }

  getRefreshToken = (payload: any) => {
    return this.jwtService.sign(
      { type: 'refresh_token', ...payload },
      { expiresIn: '7d', secret: jwtConstants.refreshTokenSecret }
    )
  }
}
