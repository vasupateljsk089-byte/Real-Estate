export const formatPrice = (price: number) => {
    if (price >= 10000000) return (price / 10000000).toFixed(2) + " Cr";
    if (price >= 100000) return (price / 100000).toFixed(2) + " Lakh";
    return (price / 1000).toFixed(2) + " K";
  };
  