"use client";
import React from 'react'
import { MongooseProvider } from './MongooseProvider';
import ToasterProvider from './ToasterProvider';
import AuthProvider from './AuthProvider';

const providers = [
  [AuthProvider, {}],
  [ToasterProvider, {}],
]

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderStack 
      providers={providers as unknown as [[React.JSXElementConstructor<ContainsChildren>, Omit<ContainsChildren, "children">], ...[React.JSXElementConstructor<ContainsChildren>, Omit<ContainsChildren, "children">][]]}
    >
        {children}
    </ProviderStack>
  )
}

type NoInfer<T> = [T][T extends any ? 0 : 1];

type ContainsChildren = {
  children?: React.ReactNode;
};

function ProviderStack<Providers extends [ContainsChildren, ...ContainsChildren[]]>({
  providers,
  children,
}: {
  providers: {
    [k in keyof Providers]: [
      React.JSXElementConstructor<Providers[k]>,
      Omit<NoInfer<Providers[k]>, 'children'>,
    ];
  };
  children: React.ReactNode;
}) {
  let node = children;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return node;
}
