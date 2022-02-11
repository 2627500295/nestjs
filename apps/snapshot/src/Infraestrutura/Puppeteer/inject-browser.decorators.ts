import { Inject } from '@nestjs/common';

import { PUPPETEER_INSTANCE } from './puppeteer.constants';

export const InjectBrowser = () => Inject(PUPPETEER_INSTANCE);
