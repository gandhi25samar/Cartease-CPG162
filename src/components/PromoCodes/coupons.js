const coupons = [
  {
    code: "GET10",
    minValue: 1000,
    discount: 0.1,
    maxDiscount: 150,
    description:
      "Apply this promo code to get a flat 10% off on your cart value up to ₹150.",
  },
  {
    code: "FLAT200",
    minValue: 1800,
    discount: 1,
    maxDiscount: 200,
    description:
      "Apply this promo code to get a flat ₹200 off on your cart value.",
  },
  {
    code: "FLAT250",
    minValue: 2000,
    discount: 1,
    maxDiscount: 250,
    description:
      "Apply this promo code to get a flat ₹250 off on your cart value.",
  },
  {
    code: "PAYDAYDEAL",
    minValue: 2500,
    discount: 0.2,
    maxDiscount: 500,
    description:
      "Apply this promo code to get a flat 20% off on your cart value up to ₹500.",
  },
  // Add more coupons here as needed
];

export default coupons;
