
import {AuthGuard} from "./auth.guard";
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core';

describe('AuthGuard',()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[AuthGuard]
        })
    });// end before

    it('should ...', inject([AuthGuard], (guard:AuthGuard)=>{
        expect(guard).toBeTruthy();
    })) // end it

}) // end describe

    

