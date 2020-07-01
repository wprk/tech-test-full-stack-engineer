import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginResponseDto } from './dto/auth.login.response.dto';
import { AuthRegisterResponseDto } from './dto/auth.register.response.dto';
import { AuthRegisterInput } from './dto/auth.register.input';
import { AuthTokenRefreshResponseDto } from './dto/auth.token.refresh.response.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<AuthLoginResponseDto> {   
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() newUser: AuthRegisterInput): Promise<AuthRegisterResponseDto> {
    return this.authService.register(newUser);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('auth/token/refresh')
  async tokenRefresh(@Request() req: any): Promise<AuthTokenRefreshResponseDto> {
    return this.authService.refreshToken(req.user);
  }
}