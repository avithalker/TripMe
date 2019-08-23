import React,{Component} from 'react';

    export function getTripType(num) 
    {
        switch(num)
        {
            case -1:
                return 'NONE';
            case  0:
                return 'SOLO';
            case  1:
                return 'COUPLES';
            case  2:
                return 'HONEYMOON';
            case  3:
                return 'FAMILY';
            case  4:
                return 'FRIENDS';
            case  5:
                return 'ROAD TRIP';
            case  6:
                return 'EXTREAM';
            case  7:
                return 'CAMPING';
            case  8:
                return 'PHOTOSHOOTING';
            default:
                return 'NULL';
        }
    }


