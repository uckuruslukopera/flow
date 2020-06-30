import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService {

    protected url: string;

    constructor(
        protected http: HttpClient,
        protected endpoint: string
    ) {
        this.url = `${environment.baseUrl}/${endpoint}`;
    }

    protected get<T>(queryParams): Observable<any> {
        return this.http.get<T>(this.url, { params: queryParams });
    }

    protected put<T>(resource): Observable<any> {
        return this.http.put<T>(this.url, resource);
    }
}
