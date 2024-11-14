import ComponenteProducto from "./ComponenteProducto";

const HistorialDeCompras = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Ordenes de compra
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Ver todos
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <ComponenteProducto />
        </ul>
      </div>
    </div>
  );
};

 export default HistorialDeCompras;
