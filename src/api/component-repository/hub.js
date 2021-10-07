import { LIST_BUNDLES_FROM_REGISTRY_OK, LIST_REGISTRIES_OK, LIST_BUNDLE_GROUPS_OK } from 'test/mocks/component-repository/hub';
import { makeRequest, METHODS } from '@entando/apimanager';

export const NO_PAGE = { page: 1, pageSize: 0 };

export const getBundlesFromRegistry = (url, page = { page: 1, pageSize: 10 }, params = '') => (
  makeRequest(
    {
      uri: `/api/bundles/${params}`,
      domain: url,
      method: METHODS.GET,
      mockResponse: LIST_BUNDLES_FROM_REGISTRY_OK,
      useAuthentication: false,
    },
    page,
  )
);

export const getRegistries = (params = '') => (
  makeRequest(
    {
      uri: `/registries/${params}`,
      domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
      method: METHODS.GET,
      mockResponse: LIST_REGISTRIES_OK,
      useAuthentication: true,
    },
    NO_PAGE,
  )
);

export const getBundleGroups = (url, page, params = '') => (
  makeRequest(
    {
      uri: `/api/bundlegroups//${params}`,
      domain: url,
      method: METHODS.GET,
      mockResponse: LIST_BUNDLE_GROUPS_OK,
      useAuthentication: false,
    },
    page,
  )
);

export const deleteRegistry = registryId => (
  makeRequest({
    uri: `/registry/${registryId}`,
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.DELETE,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
  })
);

export const addRegistry = registryObject => (
  makeRequest({
    uri: '/registries',
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.POST,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
    body: registryObject,
  })
);

export const deployBundle = bundle => (
  makeRequest({
    uri: '/bundles', // @TODO-hub set it correctly after having real API
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.POST,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
    body: bundle,
  })
);

export const undeployBundle = bundle => (
  makeRequest({
    uri: '/bundles', // @TODO-hub set it correctly after having real API
    domain: '/digital-exchange', // @TODO-hub set it correctly after having real API
    method: METHODS.POST,
    mockResponse: LIST_REGISTRIES_OK,
    useAuthentication: true,
    body: bundle,
  })
);
