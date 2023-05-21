import { SocketGateway } from '@/shared/gateways/socket.gateway';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
