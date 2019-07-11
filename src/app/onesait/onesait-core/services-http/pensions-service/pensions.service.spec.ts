import { TestBed } from '@angular/core/testing';
import { PensionsService } from './pensions.service';
// import { ItecbanPensionsServiceMock } from '../../mocks/service/itecban-pensions-mock';

describe('PensionsService', () => {
    // let mockService = new ItecbanPensionsServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PensionsService]
        });
    });

    it('should ...',  () => {
        // expect(mockService).toBeTruthy();
        // expect(mockService.getAccounts).toBeTruthy();
        // mockService.getAccounts().subscribe(
        //     function(result: any) { }
        // );
    });
});
