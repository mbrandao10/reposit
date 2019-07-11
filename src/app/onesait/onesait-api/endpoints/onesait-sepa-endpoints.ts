const BASE_URL = '/sepa-files';

export const SepaEndpoints = {
  BASIC: BASE_URL,
  POST_FILE: BASE_URL + '/bulk-uploader/_uploadFile',
  POST_CONFIRM_FILE: BASE_URL + '/bulk-uploader/_confirmUpload',
  GET_REMITTANCES: BASE_URL + '/remittances/:type',
  GET_REMITTANCE: BASE_URL + '/remittances/:type/:remittanceId',
  GET_ORDERS_OF_REMITTANCE: BASE_URL + '/remittances/:type/:remittanceId/orders',
  GET_RECEIPTSRETURNED_OF_REMITTANCE: BASE_URL + '/remittances/:type/:remittanceId/receiptsReturned',
  GET_REMITTANCES_RETURNS: BASE_URL + '/remittances/returns',
  GET_REMITTANCES_SENDERS: BASE_URL + '/remittances/returns/sender',
  GET_FILEFORMATS: BASE_URL + '/dataCatalogs/fileFormats',
  GET_REMITTANCESTATUSTYPES: BASE_URL + '/dataCatalogs/remittanceStatusTypes',
  GET_RETURNSREASONS: BASE_URL + '/dataCatalogs/returnsReasons',
  GET_RETURN_DOCUMENT:  BASE_URL + '/remittances/returns/:documentId'
};
