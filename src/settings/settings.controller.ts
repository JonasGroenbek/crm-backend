import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constant';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class SettingsController {}
