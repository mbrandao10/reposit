import { Observable } from 'rxjs';
import { Subject} from 'rxjs';
import { forkJoin } from 'rxjs';
import { Pageable } from './Pageable';

export class List {
    pagination: any = {
        hasNext: true,
        loading: false,
        pageable: Pageable
    };
    list: any = {};
    service: any;
    method: string;
    subject: Subject<any>;
    observable: Observable<any>;

    constructor(service: any, method: string) {
        this.service = service;
        this.method = method;
        this.list.data = [];

        this.subject = new Subject<any>();
        this.observable = this.subject.asObservable();
    }

    next(args?: any) {
        return Observable.create(observer => {
            if (this.pagination.hasNext && !this.pagination.loading) {
                let pagination = this.pagination;
                let list = this.list;
                let subject = this.subject;
                pagination.loading = true;
                pagination.page++;
                if (pagination.pageable && args) {
                    args.push(pagination.pageable);
                }
                this.service[this.method](...args).subscribe(function (result: any) {
                    list.data = list.data.concat(result.data);
                    result.data = list.data;
                    pagination.hasNext = result.paging && result.paging.hasMorePages;
                    pagination.pageable = result.paging;
                    pagination.loading = false;
                    subject.next(result);
                    observer.next(result);
                    observer.complete();
                }, e => {
                    pagination.loading = false;
                    observer.error(e);
                });
            } else {
                observer.complete();
            }
        });
    }

    completeList(args?: any, numPage?: number) {
        let observableData: any = [];
        for (let i = 0; i <= numPage; i++) {
            observableData.push(this.next(args));
        }
        return forkJoin(observableData);
    }

    getList() {
        return this.observable;
    }

    reset() {
        this.list.data = [];
        this.pagination.loading = false;
        this.pagination.hasNext = true;
        this.pagination.paginationKey = null;
        this.pagination.pageable = null;
    }
}
