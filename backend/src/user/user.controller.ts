import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserResponse } from '@user/responses';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  @ApiOperation({ summary: 'Find user by ID or email' })
  @ApiParam({
    name: 'idOrEmail',
    type: String,
    description: 'UUID or email of the user',
  })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOneUser(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);
    if (!user) {
      throw new NotFoundException(`User with id ${idOrEmail} not found`);
    }
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID of the user',
  })
  @ApiOkResponse({ description: 'User successfully deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.userService.delete(id, user);
  }
}
