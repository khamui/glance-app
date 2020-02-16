import { inject, Factory } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Api {
  http: HttpClient;
  private constructor(Http: HttpClient) {
    this.http = Http;
    const baseUrl = 'http://localhost:1337/api';
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        });
    });
  }

  async read(endpoint: string) {
    const response = await this.http.fetch('/' + endpoint)
    const data = await response.json();
    try {
      return data;
    }
    catch {
      throw new Error('network error');
    }
  }

  async update(endpoint: string, content: object) {
    let response = await this.http.fetch('/' + endpoint, {
      method: 'put',
      body: json(content)
    });
    const data = await response.json();
    try {
      return data;
    }
    catch {
      throw new Error('network error');
    }
  }

  create(resourcetype, content) {
    console.log(json(content));
    return this.http.fetch('/' + resourcetype, {
      method: 'post',
      body: json(content)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // LOGGER: successful sent and saved
        if (data.insertId) {
          console.log(data.insertId + ' successfully saved.')
          return data.insertId;
        }
        console.log(data.length + ' items successfully saved.');
        return data;
      })
      // LOGGER: error saved
      .catch(() => { throw new Error('network error'); });
  }

  delete(resourcetype, content) {
    return this.http.fetch('/' + resourcetype, {
      method: 'delete',
      body: json(content)
    })
      .then(response => {
        return response;
      })
      .then(data => {
        // LOGGER: successful sent and saved
        console.log(data.status + ' successfully deleted.');
        return data;
      })
      // LOGGER: error saved
      .catch(() => { throw new Error('network error'); });
  }
}
