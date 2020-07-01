import { JwtPayload } from "./jwt.payload.interface";

export interface JwtRefreshPayload extends JwtPayload {
  type: 'refresh_token'
  incrementId: number
}