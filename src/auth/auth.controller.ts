import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserhDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { UserRolesGuard } from './guards/user-roles/user-roles.guard';
import { RoleProtected } from './decorator/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // @RoleProtected(ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  login(@Body() updateUserDto: UpdateUserhDto) {
    return this.authService.login(updateUserDto);
  }

  @Get('get-user-by-token')
  getUserByToken(@Headers() rawHeader: IncomingHttpHeaders) {
    return this.authService.getUserByToken(rawHeader.token as string);
  }
  @Get('get-users')
  getAllUser() {
    return this.authService.getAllUser();
  }
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserhDto,
  ) {
    return this.authService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.remove(id);
  }
}
