import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Latest Electronics at Best Prices
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops, and more.
            </p>
            <div className="space-y-2 mb-6 text-blue-100">
              <p>✓ Free Shipping</p>
              <p>✓ Secure Payments</p>
              <p>✓ 100+ Products Available</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/products")}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-300"
              >
                Shop Now
              </Button>
              <Button
               onClick={() => navigate("/products")}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/ekart-hero1.png"
              alt="Electronics Hero"
              width={500}
              height={400}
              // className="rounded-lg shadow-2xl"
              className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
