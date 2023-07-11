import useCart from '../hooks/useCart';

const Totals = () => {
  const {totalPrice, totalItems} = useCart()

  const price = new Intl.NumberFormat(
    'de-DE', {style: 'currency', currency: 'EUR'}
  ).format(totalPrice);

  return (
    <>
      <li>Total Items: {totalItems}</li>
      <li>Total Price: {price}</li>
    </>
  );
}

export default Totals