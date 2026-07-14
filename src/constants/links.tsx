import type { RegisteredRouter, ValidateLinkOptions } from "@tanstack/react-router";
import { Dices, Hexagon } from "lucide-react";

export type OutsideLinks = {
  name: string;
  url: string;
  type: 'frontend' | 'backend' | 'other';
};

export const OUTSIDE_LINKS: OutsideLinks[] = [
  {
    name: 'Data Reservoir',
    url: 'https://dashboard.doctor-neuron.blog',
    type: 'frontend',
  },
  {
    name: 'Bread Bites',
    url: 'https://bread.doctor-neuron.blog',
    type: 'frontend',
  },
  {
    name: 'Data Faucet',
    url: 'https://faucet.doctor-neuron.blog',
    type: 'frontend',
  },
  {
    name: 'Data Reservoir API',
    url: 'https://data-reservoir-bwarhtaxb3dabud6.southeastasia-01.azurewebsites.net',
    type: 'backend',
  },
  {
    name: 'Data Faucet API',
    url: 'https://data-faucet-dpghdncchffyckhc.indonesiacentral-01.azurewebsites.net',
    type: 'backend',
  },
  {
    name: 'Bread Bites API',
    url: 'https://bread-bites-etcee5brg8f7ckgy.indonesiacentral-01.azurewebsites.net',
    type: 'backend',
  },
  {
    name: 'Biznet Gio Cloud',
    url: 'https://portal.biznetgio.com/user/login',
    type: 'other',
  },
  {
    name: 'Grafana',
    url: 'https://lavenderchinchilla393.grafana.net',
    type: 'other',
  }
];

export type UtilityLinks = {
  name: string,
  icon: React.ReactNode,
  url: ValidateLinkOptions<RegisteredRouter, unknown>['to'],
}

export const UTILITIES_LINKS: UtilityLinks[] = [
  {
    name: 'UUID7 Generator',
    url: '/utility/uuid7',
    icon: <Dices size={14}/>
  },
  {
    name: 'UUID4 Generator',
    url: '/utility/uuid4',
    icon: <Dices size={14}/>
  },
  {
    name: 'Base64 Encoder/Decoder',
    url: '/utility/base64',
    icon: <Hexagon size={14}/>
  },
  // {
  //   name: 'Color Converter',
  //   url: '/utility/uuid7',
  //   icon: <Paintbrush size={14}/>
  // },
  // {
  //   name: 'UNIX Timestamp',
  //   url: '/utility/uuid7',
  //   icon: <Clock size={14}/>
  // },
  // {
  //   name: 'Lorem Ipsum',
  //   url: '/utility/uuid7',
  //   icon: <TextInitial size={14}/>
  // }
];
