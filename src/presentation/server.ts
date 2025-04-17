import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class ServerApp {
    public static start() {
        console.log("Server started");

        CronService.createJob(
            '*/5 *****',
            () => {
                console.log("Cron job executed 1");
            }
        );

        CronService.createJob(
            '*/3 *****',
            () => {
                new CheckService(
                    // Enviamos el SuccessCallback
                    () => {
                        console.log("CheckService executed");
                    },
                    //Enviamos el ErrorCallback
                    (error) => {
                        console.error("CheckService failed:", error);
                    }
                ).execute('http://localhost:3000')
            }
        );

    }
}