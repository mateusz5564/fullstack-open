const CountryForm = ({countrySearchField, onChange}) => {
  return ( 
    <form>
      <label>
        find countries
        <input type="text" value={countrySearchField} onChange={onChange}/>
      </label>
    </form>
   );
}
 
export default CountryForm;