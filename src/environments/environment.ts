// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  redirectUrl: 'http://localhost:44444/home',
  postLogoutRedirectUri: 'http://localhost:44444/Unauthorized',
  lexiconApi: 'https://daue2lexapiwa01.azurewebsites.net/api/v1/',
  // lexiconApi: 'http://localhost:44440/api/v1/'
  googleKey: 'AIzaSyDsMxjCXdaLL2Ll_6lefaPZLU7aT5VleaI',
  googleGeoCodeApi: 'https://maps.googleapis.com/maps/api/geocode/json?',
  googleNearbyApi: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  transportationToken: 'ajYm1x4nwp4JNho2KMVfPIHY5',
  transportationUrl: 'http://data.transportation.gov/resource/'
};
