import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCurrentPage(id));
  };

  const onChangePage = (number) => {
    dispatch(setCategoryId(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // const search = searchValue ? `&search=${searchValue}` : "";
    // fetch(
    //   `https://67adaf003f5a4e1477dea217.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://67adaf003f5a4e1477dea217.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
