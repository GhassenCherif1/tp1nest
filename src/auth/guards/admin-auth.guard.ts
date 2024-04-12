import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { User } from '../decorators/user.decorator';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
    canActivate(@User() user) {
        if(!user)
            throw new UnauthorizedException()
        if(user.role != UserRoleEnum.ADMIN)
            throw new UnauthorizedException()
        return true;
      }
    
}
