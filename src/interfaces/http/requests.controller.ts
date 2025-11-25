import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateRequestResult,
  RequestsService,
} from '../../application/requests/requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FinalizeRequestDto } from './dto/finalize-request.dto';
import { CreateWorkLogDto } from './dto/create-work-log.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() dto: CreateRequestDto): Promise<CreateRequestResult> {
    return this.requestsService.createRequest({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2,
      city: dto.city,
      state: dto.state,
      postalCode: dto.postalCode,
      country: dto.country ?? 'US',
      vehicleMake: dto.vehicleMake,
      vehicleModel: dto.vehicleModel,
      vehicleYear: dto.vehicleYear,
    });
  }

  @Post(':id/capture')
  async capture(@Param('id') id: string) {
    return this.requestsService.capture(id);
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.requestsService.cancel(id);
  }

  @Post(':id/finalize')
  async finalize(@Param('id') id: string, @Body() dto: FinalizeRequestDto) {
    return this.requestsService.finalize(id, dto.finalAmountCents);
  }

  @Post(':id/work-logs')
  async createWorkLog(@Param('id') id: string, @Body() dto: CreateWorkLogDto) {
    return this.requestsService.recordWorkLog({
      serviceRequestId: id,
      mechanicName: dto.mechanicName,
      hoursWorkedMinutes: dto.hoursWorkedMinutes,
      payoutPercentage: dto.payoutPercentage,
      notes: dto.notes,
    });
  }
}

