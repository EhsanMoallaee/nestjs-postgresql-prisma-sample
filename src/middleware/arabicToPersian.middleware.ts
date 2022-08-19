import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ArabicToPersianMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    var data = req.body;
    var obj = {
        'ك' :'ک',
        'دِ': 'د',
        'بِ': 'ب',
        'زِ': 'ز',
        'ذِ': 'ذ',
        'شِ': 'ش',
        'سِ': 'س',
        'ى' :'ی',
        'ي' :'ی',
        'ئ' :'ی',
        '١' :'۱',
        '٢' :'۲',
        '٣' :'۳',
        '٤' :'۴',
        '٥' :'۵',
        '٦' :'۶',
        '٧' :'۷',
        '٨' :'۸',
        '٩' :'۹',
        '٠' :'۰',
    };
    
    Object.keys(req.body).forEach(function(dataKey) {
        if(dataKey === 'fullname' || dataKey === 'balance'){
            Object.keys(obj).forEach(function(key) {
                for(let i=0; i < req.body[dataKey].length; i++){
                    if(req.body[dataKey][i] === key)
                    req.body[dataKey] = req.body[dataKey].replace(req.body[dataKey][i], obj[key])
                }
            });
        }
        
    });    
    next();
  }
}
