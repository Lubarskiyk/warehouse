import * as argon2 from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) throw new BadRequestException('User already exists');
    const hashPassword = await argon2.hash(createUserDto.password);
    const newUser: User = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    const user = await this.userRepository.save(newUser);
    return { status: 'ok', user: user };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    const existUser = await this.userRepository.findOne({ where: { email } });
    if (!existUser) throw new BadRequestException('User not found');
    return existUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
