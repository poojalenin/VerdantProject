import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();  // FIXED: Extract productId from URL
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || 'default-image.jpg');
      } else {
        setProductData(null);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [productId, products]);  // FIXED: Add dependency to re-run when productId changes

  if (loading) {
    return <div className="text-center">Loading product details...</div>;
  }

  if (!productData) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image && productData.image.length > 0 ? (
              productData.image.map((item, index) => (
                <img 
                  key={index} 
                  onClick={() => setImage(item)} 
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" 
                  src={item} 
                  alt={`Product ${index}`} 
                />
              ))
            ) : (
              <img 
                src="default-image.jpg" 
                alt="Default Product" 
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" 
              />
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Selected Product" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img key={index} className="w-3.5" src={assets.star_icon} alt="star" />
            ))}
            <img className="w-3.5" src={assets.star_dull_icon} alt="dull star" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="mt-8"></div>
          <button 
            onClick={() => navigate('/place-order')} 
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Add to Cart
          </button>
          
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% ecofriendly product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
