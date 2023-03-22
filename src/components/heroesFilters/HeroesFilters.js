import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { fetchFilters } from "../../actions";
import { filtersChanged } from "./filtersSlice";

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

  const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters),
        dispatch = useDispatch(),
        {request} = useHttp();

  // server request for gettting of filters
  useEffect(() => {
    dispatch(fetchFilters(request));
      // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner/>;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Loading Error</h5>
  }

  const renderFilters = (arr) => {
    if (arr.lenght === 0) {
      return <h5 className="text-center mt-5">Filters were not found</h5>
    }

    return arr.map(({name, className, label}) => {
      // Используем библиотеку classnames и формируем классы динамически
      const btnClass = classNames('btn', className, {
          'active': name === activeFilter
      });

      return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(filtersChanged(name))}>{label}</button>
    })
  }

  const elements = renderFilters(filters);

    return (
      <div className="card shadow-lg mt-4">
        <div className="card-body">
          <p className="card-text">Filter Heroes based elements</p>
          <div className="btn-group">
            {elements}
          </div>
        </div>
      </div>

    )
}

export default HeroesFilters;