import { NowRequest, NowResponse } from '@vercel/node'
import axios, { AxiosError } from 'axios';

import logger from "../utils/logger";
import { AppleNotificationResponse, Environment } from "../utils/models";
import { PRODUCTION_REDIRECT, DEVELOPMENT_REDIRECT } from "../utils/variables"

module.exports = async (req: NowRequest, res: NowResponse) => {
  const { body }: { body: AppleNotificationResponse } = req;

  if (!body?.receipt || !body?.environment) {
    res.status(400).json({
      error: {
        message: 'Validation failed. Expecting: receipt and environment in the body.'
      }
    });

    return;
  }

  const sharedLoggingData = {
    id: body.receipt.download_id,
  };

  if (body.environment === Environment.PRODUCTION) {
    logger.info(JSON.stringify({
      message: `Notification received for PRODUCTION, redirecting to ${PRODUCTION_REDIRECT}`,
      data: sharedLoggingData,
    }));

    try {
      const redirect = await axios.post(PRODUCTION_REDIRECT, {
        ...req.body
      });
  
      res.status(redirect.status).json(redirect.data)
    } catch (error) {
      logger.info(JSON.stringify({
        message: `Redirect failed`,
        data: sharedLoggingData,
      }));

      res.status(error.response.status).json({
        message: 'Redirect failed'
      });
    }
  }

  if (body.environment === Environment.DEVELOPMENT) {
    logger.info(JSON.stringify({
      message: `Notification received for DEVELOPMENT, redirecting to ${DEVELOPMENT_REDIRECT}`,
      data: sharedLoggingData,
    }));

    try {
      const redirect = await  axios.post(DEVELOPMENT_REDIRECT, {
        ...req.body
      });
  
      res.status(redirect.status).json(redirect.data)
    } catch (error) {
      logger.info(JSON.stringify({
        message: `Redirect failed`,
        data: sharedLoggingData,
      }));
      
      res.status(error.response.status).json({
        message: 'Redirect failed'
      });
    }
  }
}