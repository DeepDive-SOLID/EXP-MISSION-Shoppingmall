import styles from "./CounterBox.module.scss";

interface CounterBoxProps {
  label: string;
  count: number;
  price: number;
  onDecrease: () => void;
  onIncrease: () => void;
  hidePrice?: boolean;
}

const CounterBox = ({
  label,
  count,
  price,
  onDecrease,
  onIncrease,
  hidePrice = false,
}: CounterBoxProps) => {
  return (
    <div className={styles.counterBox}>
      {label && <span>{label}</span>}

      <button onClick={onDecrease} disabled={count <= 1}>
        -
      </button>

      <span>{count}</span>
      <button onClick={onIncrease}>+</button>

      {!hidePrice && <span>{price.toLocaleString()}원</span>}
    </div>
  );
};

export default CounterBox;
