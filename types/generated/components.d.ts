import type { Schema, Struct } from '@strapi/strapi';

export interface OrganizationSharedMfoServices extends Struct.ComponentSchema {
  collectionName: 'components_organization_shared_mfo_services';
  info: {
    description: '';
    displayName: 'MFO Services';
  };
  attributes: {
    services: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['card', 'cache', 'bank_id', 'refinancing', 'service_24_7']
      > &
      Schema.Attribute.DefaultTo<'[]'>;
    time_to_approve: Schema.Attribute.Integer;
    time_to_approve_type: Schema.Attribute.Enumeration<
      ['HOUR', 'MINUTE', 'DAY']
    >;
  };
}

export interface OrganizationSharedRate extends Struct.ComponentSchema {
  collectionName: 'components_organization_shared_rates';
  info: {
    description: '';
    displayName: 'Rate and Terms';
  };
  attributes: {
    rate_first_percent: Schema.Attribute.Decimal;
    rate_first_value: Schema.Attribute.BigInteger;
    rate_from_period: Schema.Attribute.Integer;
    rate_range_type: Schema.Attribute.Enumeration<
      ['DAY', 'WEEK', 'MONTH', 'YEAR']
    >;
    rate_second_percent: Schema.Attribute.Decimal;
    rate_second_value: Schema.Attribute.BigInteger;
    rate_to_period: Schema.Attribute.Integer;
    rate_type: Schema.Attribute.Enumeration<['DAY', 'WEEK', 'MONTH', 'YEAR']>;
    terms_max: Schema.Attribute.Integer;
    terms_max_type: Schema.Attribute.Enumeration<
      ['DAY', 'WEEK', 'MONTH', 'YEAR']
    >;
  };
}

export interface OrganizationSharedRealYearPercentRate
  extends Struct.ComponentSchema {
  collectionName: 'components_organization_shared_real_year_percent_rates';
  info: {
    description: '';
    displayName: 'Real Year Percent Rate';
  };
  attributes: {
    percent_from: Schema.Attribute.Decimal;
    percent_to: Schema.Attribute.Decimal;
  };
}

export interface OrganizationMfoDetails extends Struct.ComponentSchema {
  collectionName: 'components_organization_mfo_details';
  info: {
    description: '';
    displayName: 'MFO Details';
    icon: 'folder';
  };
  attributes: {
    rate: Schema.Attribute.Component<'organization-shared.rate', false>;
    real_year_rate: Schema.Attribute.Component<
      'organization-shared.real-year-percent-rate',
      false
    >;
    services: Schema.Attribute.Component<
      'organization-shared.mfo-services',
      false
    >;
  };
}

export interface PostCredits extends Struct.ComponentSchema {
  collectionName: 'components_post_credits';
  info: {
    displayName: 'Credits';
  };
  attributes: {
    currency: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['USD', 'UAH', 'EUR']
      > &
      Schema.Attribute.DefaultTo<'[]'>;
    max_month: Schema.Attribute.Integer;
    max_value: Schema.Attribute.Integer;
    min_month: Schema.Attribute.Integer;
    min_value: Schema.Attribute.Integer;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: '';
    displayName: 'Contact';
    icon: 'user';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files'>;
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.BigInteger;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'organization-shared.mfo-services': OrganizationSharedMfoServices;
      'organization-shared.rate': OrganizationSharedRate;
      'organization-shared.real-year-percent-rate': OrganizationSharedRealYearPercentRate;
      'organization.mfo-details': OrganizationMfoDetails;
      'post.credits': PostCredits;
      'shared.contact-info': SharedContactInfo;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
