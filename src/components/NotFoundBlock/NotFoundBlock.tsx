import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p>На жаль, ця сторінка відсутня в нашому інтернет-магазині</p>
    </div>
  );
};
