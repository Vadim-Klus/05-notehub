import styles from "./SearchBox.module.css";

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export default function SearchBox({ value, onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      className={styles.input}
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
