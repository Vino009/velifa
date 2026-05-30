import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAnalysisDto {
  @IsUrl({ protocols: ['https', 'http'], require_tld: true })
  @IsNotEmpty()
  @MaxLength(2048)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  url: string = '';

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email: string = '';

  @IsString()
  @IsNotEmpty()
  cfTurnstileToken: string = '';

  @IsString()
  locale?: string = 'fr';
}
