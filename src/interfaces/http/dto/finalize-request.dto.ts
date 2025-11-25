import { IsInt, Min } from 'class-validator';

export class FinalizeRequestDto {
  @IsInt()
  @Min(0)
  finalAmountCents!: number;
}

