import expressLoader from './express';
import Logger from './logger'

export const serverLoader = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
}