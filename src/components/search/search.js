import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL } from "../../api";
import { geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const[search,setSearch] = useState(null);
    
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then((response) => {
            return{
                options: response.data.map ((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}` ,
                    }
                } )
            }
        })
        .catch(err => console.error(err));
         
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
          placeholder="Cauta Oras"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}

        />
    )
}
export default Search;