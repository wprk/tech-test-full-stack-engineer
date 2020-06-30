import { IsString } from 'class-validator'

export class AuthRegisterInput {
  @IsString()
  email: string

  @IsString()
  name: string

  @IsString()
  password: string
}