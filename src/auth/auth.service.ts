import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserhDto } from './dto/update-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interfeace';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, username, lastName, ...userData } = createUserDto;

      const regex = /[^A-Za-z ]/;
      if (regex.test(username)) {
        throw new BadRequestException(
          'El Nombre no puede contener caracteres especiales',
        );
      }

      if (regex.test(lastName)) {
        throw new BadRequestException(
          'El Apellido no puede contener caracteres especiales',
        );
      }

      const passwordCrypt = bcrypt.hashSync(password, 10);
      console.log({ passwordCrypt });

      const user = this.authRepository.create({
        ...userData,
        password: passwordCrypt,
        username: username,
        lastName: lastName,
      });

      await this.authRepository.save(user);
      delete user.password;

      return { user: user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(updateUserDto: UpdateUserhDto) {
    try {
      const { password, email } = updateUserDto;
      const user = await this.authRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credenciales invalidas');
      }

      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async getAllUser() {
    try {
      const allUsers = await this.authRepository.find();
      return allUsers;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.authRepository.findOneBy({ id });
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserhDto) {
    try {
      const { username, lastName } = updateUserDto;
      const regex = /[^A-Za-z ]/;
      if (regex.test(username)) {
        throw new BadRequestException(
          'El Nombre no puede contener caracteres especiales',
        );
      }
      if (regex.test(lastName)) {
        throw new BadRequestException(
          'El Apellido no puede contener caracteres especiales',
        );
      }
      // TODO: something
      const user = await this.authRepository.preload({
        id,
        ...updateUserDto,
      });
      if (!user) throw new NotFoundException(`No existe id: ${id}`);
      await this.authRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.authRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`No existe id: ${id}`);
      await this.authRepository.delete(id);
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
    return `This action removes a #${id} auth`;
  }

  async getUserByToken(token?: string) {
    try {
      if (!token) {
        throw new BadRequestException('Token not found');
      }
      const response = this.jwtService.verify(token);
      const user = await this.authRepository.findOneBy({ id: response.id });
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private handleDBError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(error);
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
