import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    data: {
        anonymity: string,
        country: string,
        export_address: string[],
        from: string,
        host: string,
        port: number,
        response_time: number,
        type: string
    }[] = [];

    constructor(
        private http: HttpClient
    ) { }

    loadProxyList() {
        this.http.get('https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list', {
            responseType: 'text'
        }).subscribe((response: string) => {
            const result = response.split('\n');
            for (const key in result) {
                if (result.hasOwnProperty(key)) {
                    const element = result[key];
                    if (element.length > 0) {
                        this.data.push(JSON.parse(element));
                    }
                }
            }
        });
    }
}
