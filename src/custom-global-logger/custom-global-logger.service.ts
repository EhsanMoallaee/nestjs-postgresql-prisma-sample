import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomGlobalLoggerService {
    log(logData: string | number | object) {
        const dataType = typeof(logData);

        switch(dataType) { 
            case "string": { 
            console.log("It's String Type : ", logData); 
            break; 
            } 
            case "number": { 
            console.log("It's Number Type : ", logData); 
            break; 
            } 
            case "object": {
            console.log("It's Object Type : ", logData); 
            break;    
            }
            default: { 
            console.log("Invalid Type");
            break;              
            } 
        }
    }
}
