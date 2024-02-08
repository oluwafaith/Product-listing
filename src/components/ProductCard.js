import Image from "next/image";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      key={product.id}
    >
      <a href="#" className="flex-1">
        <div className="h-64 relative">
          <Image
            className="object-contain w-full h-full rounded-t-lg"
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </a>
      <div className="flex flex-col justify-between flex-1 p-4">
        <a href="#" className="mb-2">
          <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title.length > 20
              ? product.title.substring(0, 30) + "..."
              : product.title}
          </h5>
        </a>

        <div className="flex items-center justify-between ">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
