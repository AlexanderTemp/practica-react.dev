'use client';
import React, {useState} from 'react';


/**
 * Think in React
 * 1. Break the UI into a component hierarchy 
 *  - Uso de la técnica single responsibility principle a component should ideally one thing if it ends up growing it should be decomposed into smaller subomponents.
 *  - Consider how you would organize the design's layers.
 *  - If your JSON is well-structured, youll often find that it naturally maps to the component structure of your UI. UI and data models often have the same information architecture - separate your UI into components, where each component matches one piece of your data model. 
 * 
 * 2. Build a static version in React
 *  - State is reserved only for interactivity, that is, data that change over time. Since this is a static versin of the app.
 *  - It is usually easier to go top-down, and on larger projects. It is easier to go bottom up
 * 
 * 3. Find the minimal but complete representation of UI state
 *  - Think of state as the minimal set of changing data that your app needs to remember. Principle DRY (dont repeat yourself)
 *  -  Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand. 
 * 
 * 4. Identify where your state should live 
 *  - Which component is reponsible for changing the state, or owns the state. React uses one way data flow passing data down the component hierarchy from parent to child component:
 *    1. Identify every component that renders something based on that state
 *    2. Find their closest common parent component - a component above them all in the hierarchy
 *    3. Decide where the state should live: 
 *        1. Often you can put the state directly into their common parent
 *        2. You can also put the state into some component above their common parent
 *        3. If you cant find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent components
 */


const data = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

const Think = () => {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={data}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
};

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: Function;
  onInStockOnlyChange: Function;
}

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) => {
  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        value={filterText}
        className="border w-fit"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input type="checkbox" id="checkbox" /> Only show products in stock
      </label>
    </form>
  );
};

type product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

interface ProductTableProps {
  products: product[];
  filterText: string;
  inStockOnly: boolean;
}

const ProductTable = ({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) => {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  products.forEach((elem) => {
    if (elem.category !== lastCategory) {
      rows.push(
        <ProductCategory category={elem.category} key={elem.category} />
      );
    }
    rows.push(<ProductRow product={elem} key={elem.name} />);
    lastCategory = elem.category;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

interface ProductCategoryProps {
  category: string;
}
const ProductCategory = ({category}: ProductCategoryProps) => {
  return (
    <>
      <tr>
        <th colSpan={2}>{category}</th>
      </tr>
    </>
  );
};

interface ProductRowProps {
  product: product;
}

const ProductRow = ({product}: ProductRowProps) => {
  return (
    <>
      <tr>
        <td className={`${product.stocked && 'text-red-600'}`}>
          {product.name}
        </td>
        <td>{product.price}</td>
      </tr>
    </>
  );
};

export default Think;
