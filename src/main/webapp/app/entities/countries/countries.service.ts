import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Countries } from './countries.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CountriesService {

    private resourceUrl = 'api/countries';

    constructor(private http: Http) { }

    create(countries: Countries): Observable<Countries> {
        const copy = this.convert(countries);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(countries: Countries): Observable<Countries> {
        const copy = this.convert(countries);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Countries> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(countries: Countries): Countries {
        const copy: Countries = Object.assign({}, countries);
        return copy;
    }
}
