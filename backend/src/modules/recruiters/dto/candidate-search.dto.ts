import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CandidateSearchDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'React' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'TypeScript' })
  @IsOptional()
  @IsString()
  skill?: string;

  @ApiPropertyOptional({ example: 'San Francisco' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  experienceMin?: number;

  @ApiPropertyOptional({ example: 'INTERVIEW' })
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiPropertyOptional({ example: 'job-101' })
  @IsOptional()
  @IsString()
  jobId?: string;
}
