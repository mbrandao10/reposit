export interface Json2PdfFieldDefinition {
  field: string;
  fieldTranslateKey: string;
  fieldType: {
    type: string,
    currencyCode?: string, // en el caso de ser currency el tipo llevara la moneda para formatearla
    pattern?: string // puede lleva un pattern expecifico para formatear (fecha, numero)
  };
}
