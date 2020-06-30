import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthRegisterInput } from './dto/auth.register.input'
import { AuthLoginResponseDto } from './dto/auth.login.response.dto'
import { AuthRegisterResponseDto } from './dto/auth.register.response.dto'
import { AuthTokenRefreshResponseDto } from './dto/auth.token.refresh.response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: any): Promise<AuthLoginResponseDto> {
    const payload = { userId: user.id }

    return {
      data: {
        access_token: this.jwtService.sign(payload),
      }
    }
  }

  async refreshToken(user: any): Promise<AuthTokenRefreshResponseDto> {
    const payload = { userId: user.id }
    
    return {
      data: {
        access_token: this.jwtService.sign(payload),
      }
    }
  }

  async register(newUser: AuthRegisterInput): Promise<AuthRegisterResponseDto> {
    const user = await this.userService.create(newUser)

    return {
      data: user
    }
  }
}
