import { SetMetadata } from '@nestjs/common';

export const Owner = (...args: string[]) => SetMetadata('owner', args);
