export type Links = {
  name: string;
  url: string;
  type: 'frontend' | 'backend' | 'other';
};

export const LINKS: Links[] = [
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
]
