type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
  const categories = [
    "Усе",
    "М'ясні",
    "Вегетаріанська",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
