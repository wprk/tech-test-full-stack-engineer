export class AuthTokenRefreshResponseDto {
  data: {
    access_token: string,
    refresh_token: string,
  }
}