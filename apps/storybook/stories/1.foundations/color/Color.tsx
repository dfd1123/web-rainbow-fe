'use client';

import React, { ReactElement } from 'react';
import { makeCxFunc } from '@packages/rb-utils/parserUtils';
import { ListMap, SEMANTIC_SHADOWS, Typography, TYPOGRAPHY_COLORS, VStack } from '@packages/rb-ui';
import style from './Color.module.scss';


const cx = makeCxFunc(style);
export type listItemProps = {
  name?: string;
  value?: string;
};

const SEMANTIC_TYPOGRAPHY_COLORS = Object.values(TYPOGRAPHY_COLORS).reduce(
  (acc: Record<string, string[]>, cur) => {
    const [kind] = (cur as string).split('-');

    if(kind){
      acc[kind] = [...(acc[kind] || []), cur as string];
    }

    return acc;
  },
  {} as Record<string, string[]>
);

const Color = () => {
  console.log('test!!!');
  return (
    <>
      <VStack tag="article" rowGap={32} className={cx('palette')}>
        {Object.entries(SEMANTIC_TYPOGRAPHY_COLORS).map(([kind, colorVars]) => (
          <div key={kind}>
            <Typography.H type="title-03-b" hLevel={2}>
              --rb-{kind}-
            </Typography.H>
            <Typography.Span type="label-01-reading-r">
              사용 예시: {`var(--rb-${colorVars[0]})`}
            </Typography.Span>
            <ul className={cx('palette-list')}>
              <ListMap list={colorVars}>
                {({ item }) => {
                  const [_, ...rest] = item.split('-');
                  const color = rest.join('-');

                  return (
                    <li key={item}>
                      <div
                        className={cx('color-box')}
                        style={{ backgroundColor: `var(--rb-${item})` }}
                      ></div>
                      <em>{color}</em>
                    </li>
                  );
                }}
              </ListMap>
            </ul>
          </div>
        ))}
      </VStack>
      <VStack>
        {Object.values(SEMANTIC_SHADOWS as Record<string, string>).map((shadowVar) => (
          <VStack key={shadowVar} gap={16}>
            <VStack>
              <Typography.H type="title-03-b" hLevel={2}>
                --rb-{shadowVar}-
              </Typography.H>
              <Typography.Span type="label-01-reading-r">
                사용 예시: {`var(--rb-${shadowVar})`}
              </Typography.Span>
            </VStack>
            <VStack gap={16}>
              <div
                className={cx('shadow-box')}
                style={{ boxShadow: `var(--rb-${shadowVar})` }}
              ></div>
              <Typography.Span type="label-01-reading-r">{shadowVar}</Typography.Span>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

export default Color;
