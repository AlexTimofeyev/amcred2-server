import type { Schema, Struct } from '@strapi/strapi';

export interface OrganizationSharedCreditTerms extends Struct.ComponentSchema {
  collectionName: 'components_organization_shared_credit_terms';
  info: {
    displayName: 'Credit Terms';
  };
  attributes: {
    term_from: Schema.Attribute.Integer;
    term_to: Schema.Attribute.Integer;
    term_type: Schema.Attribute.Enumeration<['DAY', 'WEEK', 'MONTH']>;
    term_value: Schema.Attribute.Decimal;
  };
}

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
        [
          'card',
          'cache',
          'bank_id',
          'refinancing',
          'online',
          'for_3min',
          'for_5min',
          'for_96h',
        ]
      > &
      Schema.Attribute.DefaultTo<'[]'>;
  };
}

export interface OrganizationSharedRate extends Struct.ComponentSchema {
  collectionName: 'components_organization_shared_rates';
  info: {
    displayName: 'rate';
  };
  attributes: {
    max_term: Schema.Attribute.Integer;
    max_value_per_year: Schema.Attribute.Integer;
    rate_per_day: Schema.Attribute.Decimal;
    rate_per_year: Schema.Attribute.Decimal;
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
    terms: Schema.Attribute.Component<
      'organization-shared.credit-terms',
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
      'organization-shared.credit-terms': OrganizationSharedCreditTerms;
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
