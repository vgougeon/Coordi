import { Product } from './classes/product';

export const PRODUCTS: Product[] = [
    new Product(1, 'Visseuse', 'Jardin', 24.9, 'https://media.adeo.com/media/1664469/format/png?format=jpg&width=700'),
    new Product(2, 'Perceuse', 'Outillage', 41.9, 'https://media.adeo.com/media/1664515/format/png?format=jpg&width=700'),
    new Product(3, 'Perforateur','Outillage', 129.0, 'https://media.adeo.com/media/1664470/format/png?format=jpg&width=700'),
    new Product(4, 'Ponceuse','Machine', 79.99, 'https://media.adeo.com/media/1664516/format/png?format=jpg&width=700'),
    new Product(5, 'Polisseuse','Machine', 69.99, 'https://media.adeo.com/media/1664517/format/png?format=jpg&width=700'),
    new Product(
      6,
      'Foret et mèche',
      'Embout',
      15.5,
      'https://m1.lmcdn.fr/media/15/5eea2473475ea72daca3dd10_original/3265160300/foret-et-meche5eea2473dab3a5000976602f.jpg?format=jpg&width=700'
    ),
    new Product(
      7,
      'Scrie électrique',
      'Machine',
      187.0,
      'https://m1.lmcdn.fr/media/15/5d761744b7c505196cf83a94/357229863/famille-scie-electrique-stationnaire5d76090f9f49ff00094806b6.jpg?format=jpg&width=700'
    ),
    new Product(
      8,
      'Tronçonneuse à métaux',
      'Machine',
      279.0,
      'https://m1.lmcdn.fr/media/15/5d7618803711266606846c65/357545486/famille-tronconneuse-a-metaux5d7618800ab56b00097c23b5.jpg?format=jpg&width=700'
    ),
  ];