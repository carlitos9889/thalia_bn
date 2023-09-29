import {
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  const request = req.switchToHttp().getRequest();

  const user = request.user;

  if (!user) {
    throw new InternalServerErrorException('User not found (request)');
  }

  return user;
});
