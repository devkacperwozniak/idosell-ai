import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { User } from 'src/typeorm/user.entity';

export class AuthRegisterDto {
  @ApiProperty({ example: 'Kacper' })
  user_name: string;

  @ApiProperty({ example: 'kacperwozniak1996@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '!@#$' })
  @IsPassword()
  password: string;
}

export class AuthLoginDto {
  @ApiProperty({ example: 'kacperwozniak1996@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPassword()
  password: string;
}

export class AuthLoginResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  user: User;
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Password has to be equall or grater then 4 characters.',
        ...validationOptions,
      },
      validator: {
        validate(value: string, args: ValidationArguments) {
          return ('' + value).length >= 4;
        },
      },
    });
  };
}
