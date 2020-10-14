export enum Environment {
  DEVELOPMENT = 'Sandbox',
  PRODUCTION = 'Production'
}

export interface AppleNotificationResponse {
  environment: Environment;
  'is-retryable': boolean;
  latest_receipt: string;
  latest_receipt_info: {
    transaction_id: string;
  }[]
  receipt: {
    download_id: string;
  }
}