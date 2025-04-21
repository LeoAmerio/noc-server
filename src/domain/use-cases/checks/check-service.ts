import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCases {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCases {
    

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback) {}
    
    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error('Failed to fetch');
            }

            const log = new LogEntity(`Service ${url} working`, LogServerityLevel.low)
            this.logRepository.saveLog( log )
            this.successCallback?.();
            return true;
        } catch (error) {
            const errorMessaje = `${error}`
            const log = new LogEntity(`Service ${url} not working, error: ${errorMessaje}`, LogServerityLevel.high)
            this.logRepository.saveLog( log )
            this.errorCallback?.(errorMessaje)
            return false;
        }
    }
}


