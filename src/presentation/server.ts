import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryInfrastructure } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryInfrastructure(
    new FileSystemDataSource()
);

export class ServerApp {
    public static start() {
        console.log("Server started");

        CronService.createJob(
            '*/5 * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is working`),
                    (error) => console.error(`${url} is not working: ${error}`)
                ).execute(url)
                // console.log("Cron job executed 1");
            }
        );

        // CronService.createJob(
        //     '*/3 *****',
        //     () => {
        //         new CheckService(
        //             fileSystemLogRepository,
        //             // Enviamos el SuccessCallback
        //             () => {
        //                 console.log("CheckService executed");
        //             },
        //             //Enviamos el ErrorCallback
        //             (error) => {
        //                 console.error("CheckService failed:", error);
        //             }
        //         ).execute('http://localhost:3000')
        //     }
        // );

    }
}