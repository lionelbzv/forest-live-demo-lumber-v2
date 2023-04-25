/* eslint-disable */
export type Schema = {
  'addresses': {
    plain: {
      'id': number;
      'address_line_1': string;
      'address_line_2': string;
      'address_city': string;
      'country': string;
      'customer_id': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'customer': Schema['customers']['plain'] & Schema['customers']['nested'];
    };
    flat: {
      'customer:id': number;
      'customer:firstname': string;
      'customer:lastname': string;
      'customer:email': string;
      'customer:created_at': string;
      'customer:updated_at': string;
      'customer:stripe_id': string;
    };
  };
  'appointments': {
    plain: {
      'id': number;
      'name': string;
      'reason': string;
      'start_date': string;
      'end_date': string;
      'created_at': string;
      'updated_at': string;
      'status': string;
    };
    nested: {};
    flat: {};
  };
  'companies': {
    plain: {
      'id': number;
      'name': string;
      'industry': string;
      'headquarter': string;
      'status': string;
      'description': string;
      'created_at': string;
      'updated_at': string;
      'certificate_of_incorporation_id': string;
      'proof_of_address_id': string;
      'bank_statement_id': string;
      'passport_id': string;
      'possibleclasses': Array<string>;
    };
    nested: {};
    flat: {};
  };
  'customers': {
    plain: {
      'id': number;
      'firstname': string;
      'lastname': string;
      'email': string;
      'created_at': string;
      'updated_at': string;
      'stripe_id': string;
    };
    nested: {};
    flat: {};
  };
  'deliveries': {
    plain: {
      'id': number;
      'phone': string;
      'lng': number;
      'lat': number;
      'is_delivered': boolean;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'documents': {
    plain: {
      'id': number;
      'file_id': string;
      'is_verified': boolean;
    };
    nested: {};
    flat: {};
  };
  'orders': {
    plain: {
      'ref': string;
      'shipping_status': string;
      'created_at': string;
      'updated_at': string;
      'product_id': number;
      'customer_id': number;
      'being_processed_at': string;
      'delivery_id': number;
      'ready_for_shipping_at': string;
      'in_transit_at': string;
      'shipped_at': string;
    };
    nested: {
      'product': Schema['products']['plain'] & Schema['products']['nested'];
      'customer': Schema['customers']['plain'] & Schema['customers']['nested'];
      'delivery': Schema['deliveries']['plain'] & Schema['deliveries']['nested'];
    };
    flat: {
      'product:id': number;
      'product:created_at': string;
      'product:updated_at': string;
      'product:price': number;
      'product:label': string;
      'product:picture': string;
      'customer:id': number;
      'customer:firstname': string;
      'customer:lastname': string;
      'customer:email': string;
      'customer:created_at': string;
      'customer:updated_at': string;
      'customer:stripe_id': string;
      'delivery:id': number;
      'delivery:phone': string;
      'delivery:lng': number;
      'delivery:lat': number;
      'delivery:is_delivered': boolean;
      'delivery:created_at': string;
      'delivery:updated_at': string;
    };
  };
  'products': {
    plain: {
      'id': number;
      'created_at': string;
      'updated_at': string;
      'price': number;
      'label': string;
      'picture': string;
    };
    nested: {};
    flat: {};
  };
  'transactions': {
    plain: {
      'id': number;
      'beneficiary_iban': string;
      'emitter_iban': string;
      'vat_amount': number;
      'amount': number;
      'fee_amount': number;
      'note': string;
      'emitter_bic': string;
      'beneficiary_bic': string;
      'reference': string;
      'created_at': string;
      'updated_at': string;
      'beneficiary_company_id': number;
      'emitter_company_id': number;
      'status': string;
    };
    nested: {
      'beneficiary_company': Schema['companies']['plain'] & Schema['companies']['nested'];
      'emitter_company': Schema['companies']['plain'] & Schema['companies']['nested'];
    };
    flat: {
      'beneficiary_company:id': number;
      'beneficiary_company:name': string;
      'beneficiary_company:industry': string;
      'beneficiary_company:headquarter': string;
      'beneficiary_company:status': string;
      'beneficiary_company:description': string;
      'beneficiary_company:created_at': string;
      'beneficiary_company:updated_at': string;
      'beneficiary_company:certificate_of_incorporation_id': string;
      'beneficiary_company:proof_of_address_id': string;
      'beneficiary_company:bank_statement_id': string;
      'beneficiary_company:passport_id': string;
      'beneficiary_company:possibleclasses': Array<string>;
      'emitter_company:id': number;
      'emitter_company:name': string;
      'emitter_company:industry': string;
      'emitter_company:headquarter': string;
      'emitter_company:status': string;
      'emitter_company:description': string;
      'emitter_company:created_at': string;
      'emitter_company:updated_at': string;
      'emitter_company:certificate_of_incorporation_id': string;
      'emitter_company:proof_of_address_id': string;
      'emitter_company:bank_statement_id': string;
      'emitter_company:passport_id': string;
      'emitter_company:possibleclasses': Array<string>;
    };
  };
};
