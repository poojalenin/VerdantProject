import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Our eco-friendly journey started with a vision: to create a platform that brings
            sustainable, planet-friendly products to everyone's doorstep. We are committed to reducing
            environmental impact by offering products that are ethically sourced, biodegradable, and
            designed to promote a healthier planet.
          </p>
          <p>
            From reusable household essentials to natural personal care items, our collection is
            thoughtfully curated to align with sustainable living principles. We work closely with
            environmentally conscious brands and suppliers to bring you the best in eco-friendly
            innovation.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals to make mindful choices that benefit both people and
            the planet. By providing high-quality, eco-friendly alternatives, we strive to inspire a
            more sustainable way of living and shopping.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Eco-Conscious Products:</b>
          <p className="text-gray-600">
            We prioritize sustainability by offering products made from renewable, recyclable, and
            biodegradable materials.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenient Green Shopping:</b>
          <p className="text-gray-600">
            Our user-friendly platform makes it easy to discover and purchase eco-friendly products
            that fit seamlessly into your lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Commitment to Sustainability:</b>
          <p className="text-gray-600">
            We are dedicated to reducing waste and carbon footprints by promoting sustainable choices
            at every step of your shopping journey.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
