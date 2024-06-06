import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TodoModule, UserModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
