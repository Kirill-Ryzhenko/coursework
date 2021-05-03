import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('auth')
  async render(@Req() req) {
    return this.authService.render(
      req.flash('loginError'),
      req.flash('registerError'),
    );
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() request, @Res() res: Response) {
    const token = await this.authService.login(request.user);
    res.cookie('Authentication', token.access_token);
    res.redirect('/');
  }

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const status = await this.authService.register(dto, req.body.confirm);
    if (status === 'good') {
      return res.redirect('/auth#login');
    } else {
      req.flash('registerError', status);
      res.redirect('/auth#register');
    }
  }
}
  