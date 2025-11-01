import type { Schema, Struct } from '@strapi/strapi';

export interface MediaImage extends Struct.ComponentSchema {
  collectionName: 'components_media_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image_url: Schema.Attribute.String;
    thumbnail_url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.image': MediaImage;
    }
  }
}
