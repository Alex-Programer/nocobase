import { FormOutlined } from '@ant-design/icons';
import { ISchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../..';
import { useCollectionManager } from '../../../collection-manager';
import { useSchemaTemplateManager } from '../../../schema-templates';
import { useCollectionDataSourceItems } from '../utils';

const createSchema = (collectionName) => {
  const schema: ISchema = {
    type: 'void',
    'x-collection': 'collections',
    'x-decorator': 'ResourceActionProvider',
    'x-decorator-props': {
      collection: collectionName,
      request: {
        resource: collectionName,
        action: 'get',
        params: {},
      },
    },
    'x-designer': 'Form.Designer',
    'x-component': 'CardItem',
    properties: {
      form: {
        type: 'void',
        'x-decorator': 'Form',
        'x-decorator-props': {},
        properties: {
          grid: {
            type: 'void',
            'x-component': 'Grid',
            'x-initializer': 'GridFormItemInitializers',
            properties: {},
          },
          actions: {
            type: 'void',
            'x-initializer': 'FormActionInitializers',
            'x-component': 'ActionBar',
            'x-component-props': {
              layout: 'one-column',
              style: {
                marginTop: 24,
              },
            },
            properties: {},
          },
        },
      },
    },
  };
  return schema;
};

export const FormBlockInitializer = (props) => {
  const { insert } = props;
  const { collections } = useCollectionManager();
  const { t } = useTranslation();
  const { getTemplateSchemaByMode } = useSchemaTemplateManager();
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<FormOutlined />}
      onClick={async ({ item }) => {
        if (item.template) {
          const s = await getTemplateSchemaByMode(item);
          insert(s);
        } else {
          insert(createSchema(item.name));
        }
      }}
      items={useCollectionDataSourceItems('Form')}
    />
  );
};