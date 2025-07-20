import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
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
