// export const BASE_URL = 'http://127.0.0.1:8080/api/v1/';

export const configHeader = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const BASE_URL = 'http://127.0.0.1:8080/api/v1';

/**
 * This class creates  'AppAlert' instances that will be used across the various contexts in the application
 */
export class AppAlert {
  /**
   *
   * @param {String} detail The Alert Message itself
   * @param {String} type whether its a 'success' or 'error
   */
  constructor(detail, type) {
    //Setting the alert heading on what alert type it is
    this.heading = type === 'success' ? 'Awesome' : 'Uh Oh';
    this.detail = detail;
    this.type = type;
  }
}
