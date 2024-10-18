import { Environment } from '@config/app-config';
import { LogLevel } from '@nestjs/common';

const CreateLogLevel = (env: Environment | string): LogLevel[] => {
  const environment: Environment =
    typeof env === 'string' ? Environment[env.toUpperCase()] : env;

  const mandatoryLogLevels: LogLevel[] = ['log', 'error', 'fatal'];

  switch (environment) {
    case Environment.LOCAL:
      return [...mandatoryLogLevels, 'warn', 'debug', 'verbose'];
    case Environment.DEV:
      return [...mandatoryLogLevels, 'warn', 'debug', 'verbose'];
    case Environment.TEST:
      return [...mandatoryLogLevels, 'warn', 'debug'];
    case Environment.STAGING:
      return [...mandatoryLogLevels, 'warn', 'debug'];
    case Environment.PROD:
      return mandatoryLogLevels;
    default:
      return [...mandatoryLogLevels, 'warn', 'debug', 'verbose'];
  }
};

export default CreateLogLevel;
