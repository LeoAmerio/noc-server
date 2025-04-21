import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryInfrastructure implements LogRepository {
    // private logDatasource: LogDataSource;
    constructor(
        private readonly logDatasource: LogDataSource
    ) { }

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log)
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel)
    }
 


    
}




