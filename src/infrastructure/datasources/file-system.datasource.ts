import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {
    private readonly logPath = 'logs/'
    private readonly allLogsPath    = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath   = 'logs/logs-high.log'

    constructor() {}

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return; 

            fs.writeFileSync(path, '')
        })


        // if (fs.existsSync(this.allLogsPath)) return;
        // fs.writeFileSync(this.allLogsPath, '')
        // fs.writeFileSync(this.mediumLogsPath, '')
        // fs.writeFileSync(this.highLogsPath, '')
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.")
    }

    getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }



}




