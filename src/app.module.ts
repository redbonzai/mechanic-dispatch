import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestsModule } from './modules/requests/requests.module';
import { MechanicsModule } from './modules/mechanics/mechanics.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RequestsModule, MechanicsModule],
})
export class AppModule {}
