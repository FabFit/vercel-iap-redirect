import pino from 'pino';

const logger = pino({
  name: 'iap-redirect'
});

export default logger;